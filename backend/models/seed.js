require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const fs = require('fs');
const path = require('path');

async function seed() {
  const client = await pool.connect();

  try {
    console.log('Running schema...');
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await client.query(schema);

    console.log('Seeding users...');

    const hash = (pw) => bcrypt.hashSync(pw, 10);

    // Insert HR user first (no manager)
    const hrResult = await client.query(
      `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id`,
      ['Aisha Nair', 'hr@test.com', hash('123456'), 'hr']
    );
    const hrId = hrResult.rows[0].id;

    // Insert Manager
    const managerResult = await client.query(
      `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id`,
      ['Arjun Kumar', 'manager@test.com', hash('123456'), 'manager']
    );
    const managerId = managerResult.rows[0].id;

    // Insert Employee (assigned to manager)
    const empResult = await client.query(
      `INSERT INTO users (name, email, password, role, manager_id) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      ['Rahul Sharma', 'employee@test.com', hash('123456'), 'employee', managerId]
    );
    const empId = empResult.rows[0].id;

    // Insert extra employees for team view
    const emp2Result = await client.query(
      `INSERT INTO users (name, email, password, role, manager_id) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      ['Priya Mehta', 'priya@test.com', hash('123456'), 'employee', managerId]
    );
    const emp2Id = emp2Result.rows[0].id;

    const emp3Result = await client.query(
      `INSERT INTO users (name, email, password, role, manager_id) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      ['Neha Patel', 'neha@test.com', hash('123456'), 'employee', managerId]
    );
    const emp3Id = emp3Result.rows[0].id;

    console.log('Seeding leave requests...');

    // Pending manager approval (for manager dashboard)
    await client.query(
      `INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, reason, status)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [empId, 'sick', '2026-04-01', '2026-04-02', 'Fever and cold', 'pending_manager']
    );

    await client.query(
      `INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, reason, status)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [emp2Id, 'casual', '2026-04-03', '2026-04-03', 'Personal work', 'pending_manager']
    );

    // Pending HR approval (for HR dashboard)
    const req3 = await client.query(
      `INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, reason, status)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [emp3Id, 'earned', '2026-04-07', '2026-04-11', 'Family vacation', 'pending_hr']
    );

    // Record manager approval for req3
    await client.query(
      `INSERT INTO leave_approvals (leave_request_id, approver_id, role, action, comments)
       VALUES ($1, $2, $3, $4, $5)`,
      [req3.rows[0].id, managerId, 'manager', 'approved', 'Team coverage confirmed']
    );

    // Fully approved leave
    const req4 = await client.query(
      `INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, reason, status)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [empId, 'casual', '2026-03-20', '2026-03-21', 'Personal errand', 'approved']
    );
    await client.query(
      `INSERT INTO leave_approvals (leave_request_id, approver_id, role, action, comments)
       VALUES ($1, $2, $3, $4, $5)`,
      [req4.rows[0].id, managerId, 'manager', 'approved', 'Approved']
    );
    await client.query(
      `INSERT INTO leave_approvals (leave_request_id, approver_id, role, action, comments)
       VALUES ($1, $2, $3, $4, $5)`,
      [req4.rows[0].id, hrId, 'hr', 'approved', 'Final approval granted']
    );

    // Rejected leave
    const req5 = await client.query(
      `INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, reason, status)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [empId, 'earned', '2026-04-14', '2026-04-18', 'Holiday trip', 'rejected']
    );
    await client.query(
      `INSERT INTO leave_approvals (leave_request_id, approver_id, role, action, comments)
       VALUES ($1, $2, $3, $4, $5)`,
      [req5.rows[0].id, managerId, 'manager', 'rejected', 'Critical sprint week, cannot approve']
    );

    console.log('\nSeed complete! Credentials:');
    console.log('  Employee : employee@test.com / 123456');
    console.log('  Manager  : manager@test.com  / 123456');
    console.log('  HR       : hr@test.com       / 123456');
  } catch (err) {
    console.error('Seed failed:', err.message);
  } finally {
    client.release();
    pool.end();
  }
}

seed();
