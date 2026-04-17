// Excel file parser
export const parseExcelFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const { read } = await import("xlsx");
        const workbook = read(event.target.result, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = read(workbook, { sheet: worksheet.name, defval: "" });

        // Convert to JSON with proper headers
        const jsonData = [];

        // Skip header row
        const rows = Object.keys(worksheet).filter(
          (key) => !isNaN(key.slice(1))
        );

        rows.slice(1).forEach((row) => {
          const rowData = {};
          for (let col = 1; col <= 10; col++) {
            const cellRef = String.fromCharCode(64 + col) + row.slice(1);
            rowData[worksheet[row.slice(0, 1) + col]?.v || `col${col}`] =
              worksheet[cellRef]?.v || "";
          }
          jsonData.push(rowData);
        });

        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsArrayBuffer(file);
  });
};

// Simple CSV parser as fallback
export const parseCSVFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csv = event.target.result;
        const lines = csv.split("\n");
        const headers = lines[0].split(",").map((h) => h.trim());
        const data = [];

        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim() === "") continue;

          const obj = {};
          const values = lines[i].split(",");
          headers.forEach((header, index) => {
            obj[header] = values[index]?.trim() || "";
          });
          data.push(obj);
        }

        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsText(file);
  });
};

// Hash password (client-side for admin - use bcrypt on backend in production)
export const hashPassword = (password) => {
  // This is a placeholder - in production, handle password hashing on backend
  return btoa(password); // Simple base64 encoding for demo
};

// Verify password
export const verifyPassword = (password, hash) => {
  return btoa(password) === hash;
};

// Validate CNIC format
export const validateCNIC = (cnic) => {
  const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
  return cnicRegex.test(cnic);
};

// Validate email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Format date
export const formatDate = (date) => {
  if (!date) return "";
  if (typeof date === "object" && date.toDate) {
    date = date.toDate(); // For Firestore Timestamp
  }
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Format time
export const formatTime = (date) => {
  if (!date) return "";
  if (typeof date === "object" && date.toDate) {
    date = date.toDate();
  }
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
