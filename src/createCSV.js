const fs = require("fs");

// Data to be written to the CSV file
const headers = [
  "id",
  "email",
  "username",
  "created_at",
  "updated_at",
  "name",
  "seen_notification_id",
  "last_posted_at",
  "password_hash",
  "salt",
  "active",
  "username_lower",
  "last_seen_at",
  "admin",
];

// Function to generate a sample row of data
const generateSampleRow = (id) => {
  return [
    id,
    `user${id}@example.com`,
    `user${id}`,
    "2024-03-23",
    "2024-03-23",
    `User ${id}`,
    Math.floor(Math.random() * 1000),
    "2024-03-23",
    "password_hash_here",
    "salt_here",
    "t",
    `user${id}`,
    "2024-03-23",
    "f",
  ].join(",");
};

// Generate sample data rows
const numRows = 100;
const dataRows = [];
for (let i = 1; i <= numRows; i++) {
  dataRows.push(generateSampleRow(i));
}

// Combine header row and data rows
const csvContent = [headers.join(","), ...dataRows].join("\n");

// Write CSV content to a file
fs.writeFile("src/users.csv", csvContent, "utf8", (err) => {
  if (err) {
    console.error("Error writing CSV file:", err);
  } else {
    console.log("CSV file users.csv created successfully.");
  }
});
