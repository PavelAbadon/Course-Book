import Course from "../models/Course.js";

export function createCourse(courseData, userId) {
    return Course.create({
        ...courseData, 
        owner: userId}
)}

export function getAllCorses(){
    return Course.find();
}

export function getLatest (){
    return Course.find().sort({_id:-1}).limit(3);
}

export function getOneById (courseId){
    return Course.findById(courseId).populate(['owner', 'signed']);
}

export function signedCourse (courseId, userId){
    return Course.findByIdAndUpdate( courseId, { $addToSet:{signed:userId} });
}