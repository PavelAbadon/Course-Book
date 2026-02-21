import Course from "../models/Course.js";

export function createCourse(courseData, userId) {
    return Course.create({
        ...courseData, 
        owner: userId}
)}