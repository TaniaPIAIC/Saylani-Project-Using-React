import { db } from "./auth";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";

// ==================== STUDENTS ====================

// Get all students
export const getAllStudents = async () => {
    const snapshot = await getDocs(collection(db, "students"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Get student by ID
export const getStudentById = async (studentId) => {
    const docRef = doc(db, "students", studentId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

// Get student by CNIC
export const getStudentByCNIC = async (cnic) => {
    const q = query(collection(db, "students"), where("cnic", "==", cnic));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Get student by email
export const getStudentByEmail = async (email) => {
    const q = query(collection(db, "students"), where("email", "==", email));
    const snapshot = await getDocs(q);
    return snapshot.docs.length > 0
      ? { id: snapshot.docs[0].id, ...snapshot.docs[0].data() }
      : null;
};

// Add single student (admin)
export const addStudent = async (studentData) => {
    const docRef = await addDoc(collection(db, "students"), {
      ...studentData,
      createdAt: Timestamp.now(),
    });
    return { id: docRef.id, ...studentData };
};

// Bulk add students from Excel
export const bulkAddStudents = async (studentsArray) => {
    const batch = [];
    for (const student of studentsArray) {
      const docRef = await addDoc(collection(db, "students"), {
        ...student,
        createdAt: Timestamp.now(),
      });
      batch.push({ id: docRef.id, ...student });
    }
    return batch;
};

// Update student
export const updateStudent = async (studentId, updates) => {
    const docRef = doc(db, "students", studentId);
    await updateDoc(docRef, updates);
    return { id: studentId, ...updates };
};

// Delete student
export const deleteStudent = async (studentId) => {
    await deleteDoc(doc(db, "students", studentId));
};

// ==================== COURSES ====================

// Get all courses
export const getAllCourses = async () => {
    const snapshot = await getDocs(collection(db, "courses"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Get course by ID
export const getCourseById = async (courseId) => {
    const docRef = doc(db, "courses", courseId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

// Add course (admin)
export const addCourse = async (courseData) => {
    const docRef = await addDoc(collection(db, "courses"), {
      ...courseData,
      createdAt: Timestamp.now(),
    });
    return { id: docRef.id, ...courseData };
};

// Update course (admin)
export const updateCourse = async (courseId, updates) => {
    const docRef = doc(db, "courses", courseId);
    await updateDoc(docRef, updates);
    return { id: courseId, ...updates };
};

// Delete course (admin)
export const deleteCourse = async (courseId) => {
    await deleteDoc(doc(db, "courses", courseId));
};

// ==================== APPLICATIONS ====================

// Submit course application
export const submitApplication = async (applicationData) => {
    const docRef = await addDoc(collection(db, "applications"), {
      ...applicationData,
      status: "pending",
      createdAt: Timestamp.now(),
    });
    return { id: docRef.id, ...applicationData };
};

// Get student applications
export const getStudentApplications = async (studentId) => {
    const q = query(
      collection(db, "applications"),
      where("studentId", "==", studentId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Get all applications
export const getAllApplications = async () => {
    const snapshot = await getDocs(collection(db, "applications"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ==================== LEAVES ====================

// Submit leave request
export const submitLeaveRequest = async (leaveData) => {
    const docRef = await addDoc(collection(db, "leaves"), {
      ...leaveData,
      status: "pending",
      createdAt: Timestamp.now(),
    });
    return { id: docRef.id, ...leaveData };
};

// Get student leaves
export const getStudentLeaves = async (studentId) => {
    const q = query(
      collection(db, "leaves"),
      where("studentId", "==", studentId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Get all leaves (admin)
export const getAllLeaves = async () => {
    const snapshot = await getDocs(collection(db, "leaves"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Update leave status (admin)
export const updateLeaveStatus = async (leaveId, status, comments = "") => {
    const docRef = doc(db, "leaves", leaveId);
    await updateDoc(docRef, { status, comments, updatedAt: Timestamp.now() });
    return { id: leaveId, status, comments };
};

// ==================== ADMINS ====================

// Add admin
export const addAdmin = async (adminData) => {
    const docRef = await addDoc(collection(db, "admins"), {
      ...adminData,
      createdAt: Timestamp.now(),
    });
    return { id: docRef.id, ...adminData };
};

// Get admin by username
export const getAdminByUsername = async (username) => {
    const q = query(
      collection(db, "admins"),
      where("username", "==", username)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.length > 0
      ? { id: snapshot.docs[0].id, ...snapshot.docs[0].data() }
      : null;
};

// Update admin password
export const updateAdminPassword = async (adminId, newPasswordHash) => {
    const docRef = doc(db, "admins", adminId);
    await updateDoc(docRef, { password: newPasswordHash });
};

// Get all admins
export const getAllAdmins = async () => {
    const snapshot = await getDocs(collection(db, "admins"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
