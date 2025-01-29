import mysql from "mysql2";
import bcrypt from "bcrypt";

export const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  })
  .promise();

async function initialize(): Promise<void> {
  try {
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        phone VARCHAR(20) NOT NULL UNIQUE,
        password CHAR(60) NOT NULL,
        role VARCHAR(10) DEFAULT 'user' NOT NULL,
        refresh_token VARCHAR(600),
        PRIMARY KEY (id)
      )`;

    const createItemsTable = `
      CREATE TABLE IF NOT EXISTS items (
        id INT AUTO_INCREMENT,
        category VARCHAR(30) NOT NULL,
        size INT NOT NULL,
        description VARCHAR(500) NOT NULL,
        lender_id INT NOT NULL,
        borrower_id INT,
        PRIMARY KEY (id),
        FOREIGN KEY (lender_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (borrower_id) REFERENCES users (id) ON DELETE SET NULL
      )`;

    const createCommentsTable = `
      CREATE TABLE IF NOT EXISTS comments (
        id INT AUTO_INCREMENT,
        content VARCHAR(500) NOT NULL,
        item_id INT NOT NULL,
        user_id INT NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (item_id) REFERENCES items (id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )`;

    const adminPwd = await bcrypt.hash("admin", 10);
    const createDefaultAdmin = `
      INSERT IGNORE INTO users (first_name, last_name, email, phone, password, role)
        VALUES ("admin", "admin", "admin@gemach.com", "000-000-0000", ?, "admin")
      `;

    await pool.query(createUsersTable);
    await pool.query(createItemsTable);
    await pool.query(createCommentsTable);
    await pool.query(createDefaultAdmin, adminPwd);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

initialize();
