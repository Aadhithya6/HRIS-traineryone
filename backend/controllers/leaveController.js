const pool = require('../config/db');

/**
 * POST /leave/apply
 * Employee applies for leave
 * Body: { leave_type, start_date, end_date, reason }
 */
async function applyLeave(req, res) {
  const { leave_type, start_date, end_date, reason } = req.body;
  const employee_id = req.user.id;

  if (!leave_type || !start_date || !end_date) {
    return res.status(400).json({ error: 'leave_type, start_date and end_date are required' });
  }

  const validTypes = ['casual', 'sick', 'earned'];
  if (!validTypes.includes(leave_type)) {
    return res.status(400).json({ error: 'leave_type must be casual, sick, or earned' });
  }

  if (new Date(start_date) > new Date(end_date)) {
    return res.status(400).json({ error: 'start_date cannot be after end_date' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, reason, status)
       VALUES ($1, $2, $3, $4, $5, 'pending_manager')
       RETURNING id, leave_type, start_date, end_date, reason, status, created_at`,
      [employee_id, leave_type, start_date, end_date, reason || null]
    );

    return res.status(201).json({
      message: 'Leave request submitted successfully',
      leave: result.rows[0],
    });
  } catch (err) {
    console.error('Apply leave error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * GET /leave/my
 * Employee views their own leave history
 */
async function getMyLeaves(req, res) {
  const employee_id = req.user.id;

  try {
    const result = await pool.query(
      `SELECT
         lr.id, lr.leave_type, lr.start_date, lr.end_date, lr.reason,
         lr.status, lr.created_at, lr.updated_at,
         (lr.end_date - lr.start_date + 1) AS total_days,
         json_agg(
           json_build_object(
             'role', la.role,
             'action', la.action,
             'comments', la.comments,
             'action_at', la.action_at
           ) ORDER BY la.action_at
         ) FILTER (WHERE la.id IS NOT NULL) AS approvals
       FROM leave_requests lr
       LEFT JOIN leave_approvals la ON la.leave_request_id = lr.id
       WHERE lr.employee_id = $1
       GROUP BY lr.id
       ORDER BY lr.created_at DESC`,
      [employee_id]
    );

    return res.json({ leaves: result.rows });
  } catch (err) {
    console.error('Get my leaves error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * GET /leave/team
 * Manager views leave requests of their team (employees with manager_id = req.user.id)
 * Only shows pending_manager status (awaiting this manager's action)
 */
async function getTeamLeaves(req, res) {
  const manager_id = req.user.id;

  try {
    const result = await pool.query(
      `SELECT
         lr.id, lr.leave_type, lr.start_date, lr.end_date, lr.reason,
         lr.status, lr.created_at,
         (lr.end_date - lr.start_date + 1) AS total_days,
         u.name AS employee_name,
         u.email AS employee_email
       FROM leave_requests lr
       JOIN users u ON u.id = lr.employee_id
       WHERE u.manager_id = $1
         AND lr.status = 'pending_manager'
       ORDER BY lr.created_at ASC`,
      [manager_id]
    );

    return res.json({ leaves: result.rows });
  } catch (err) {
    console.error('Get team leaves error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * PATCH /leave/:id/manager-action
 * Manager approves or rejects a leave request
 * Body: { action: 'approved' | 'rejected', comments }
 */
async function managerAction(req, res) {
  const { id } = req.params;
  const { action, comments } = req.body;
  const manager_id = req.user.id;

  if (!action || !['approved', 'rejected'].includes(action)) {
    return res.status(400).json({ error: 'action must be approved or rejected' });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Verify the leave belongs to one of this manager's employees
    const leaveResult = await client.query(
      `SELECT lr.id, lr.status, u.manager_id
       FROM leave_requests lr
       JOIN users u ON u.id = lr.employee_id
       WHERE lr.id = $1`,
      [id]
    );

    if (leaveResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Leave request not found' });
    }

    const leave = leaveResult.rows[0];

    if (leave.manager_id !== manager_id) {
      await client.query('ROLLBACK');
      return res.status(403).json({ error: 'This leave does not belong to your team' });
    }

    if (leave.status !== 'pending_manager') {
      await client.query('ROLLBACK');
      return res.status(409).json({ error: `Leave is already in status: ${leave.status}` });
    }

    // Determine new status
    const newStatus = action === 'approved' ? 'pending_hr' : 'rejected';

    // Update leave status
    await client.query(
      `UPDATE leave_requests
       SET status = $1, updated_at = NOW()
       WHERE id = $2`,
      [newStatus, id]
    );

    // Record in audit log
    await client.query(
      `INSERT INTO leave_approvals (leave_request_id, approver_id, role, action, comments)
       VALUES ($1, $2, 'manager', $3, $4)`,
      [id, manager_id, action, comments || null]
    );

    await client.query('COMMIT');

    return res.json({
      message: `Leave ${action} by manager. New status: ${newStatus}`,
      leave_id: id,
      new_status: newStatus,
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Manager action error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
}

/**
 * GET /leave/all
 * HR views all leave requests that are pending HR approval
 */
async function getAllLeaves(req, res) {
  try {
    const result = await pool.query(
      `SELECT
         lr.id, lr.leave_type, lr.start_date, lr.end_date, lr.reason,
         lr.status, lr.created_at,
         (lr.end_date - lr.start_date + 1) AS total_days,
         u.name AS employee_name,
         u.email AS employee_email,
         m.name AS manager_name,
         json_agg(
           json_build_object(
             'role', la.role,
             'action', la.action,
             'comments', la.comments,
             'action_at', la.action_at
           ) ORDER BY la.action_at
         ) FILTER (WHERE la.id IS NOT NULL) AS approvals
       FROM leave_requests lr
       JOIN users u ON u.id = lr.employee_id
       LEFT JOIN users m ON m.id = u.manager_id
       LEFT JOIN leave_approvals la ON la.leave_request_id = lr.id
       WHERE lr.status = 'pending_hr'
       GROUP BY lr.id, u.name, u.email, m.name
       ORDER BY lr.created_at ASC`
    );

    return res.json({ leaves: result.rows });
  } catch (err) {
    console.error('Get all leaves error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * PATCH /leave/:id/hr-action
 * HR gives final approval or rejection
 * Body: { action: 'approved' | 'rejected', comments }
 */
async function hrAction(req, res) {
  const { id } = req.params;
  const { action, comments } = req.body;
  const hr_id = req.user.id;

  if (!action || !['approved', 'rejected'].includes(action)) {
    return res.status(400).json({ error: 'action must be approved or rejected' });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const leaveResult = await client.query(
      'SELECT id, status FROM leave_requests WHERE id = $1',
      [id]
    );

    if (leaveResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Leave request not found' });
    }

    const leave = leaveResult.rows[0];

    if (leave.status !== 'pending_hr') {
      await client.query('ROLLBACK');
      return res.status(409).json({ error: `Leave is in status: ${leave.status}. HR can only act on pending_hr.` });
    }

    const newStatus = action === 'approved' ? 'approved' : 'rejected';

    await client.query(
      `UPDATE leave_requests
       SET status = $1, updated_at = NOW()
       WHERE id = $2`,
      [newStatus, id]
    );

    await client.query(
      `INSERT INTO leave_approvals (leave_request_id, approver_id, role, action, comments)
       VALUES ($1, $2, 'hr', $3, $4)`,
      [id, hr_id, action, comments || null]
    );

    await client.query('COMMIT');

    return res.json({
      message: `Leave ${action} by HR. Final status: ${newStatus}`,
      leave_id: id,
      new_status: newStatus,
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('HR action error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
}

module.exports = {
  applyLeave,
  getMyLeaves,
  getTeamLeaves,
  managerAction,
  getAllLeaves,
  hrAction,
};
