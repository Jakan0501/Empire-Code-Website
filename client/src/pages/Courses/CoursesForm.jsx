import React from 'react';
import '../../css/Courses.css';

const CourseForm = ({
    formData,
    setFormData,
    teachers,
    error,
    onSubmit,
    mode = 'create',
}) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="field-container">
                <label htmlFor="courseTitle">Course Title</label>
                <input
                    id="courseTitle"
                    type="text"
                    placeholder="Enter Course Title"
                    value={formData.courseTitle}
                    onChange={(e) => setFormData({ ...formData, courseTitle: e.target.value })}
                    required={mode !== 'view'}
                    disabled={mode === 'view'}
                />
            </div>

            <div className="field-container">
                <label htmlFor="courseDescription">Course Description</label>
                <textarea
                    id="courseDescription"
                    placeholder="Enter Course Description (optional)"
                    value={formData.courseDescription}
                    onChange={(e) => setFormData({ ...formData, courseDescription: e.target.value })}
                    disabled={mode === 'view'}
                />
            </div>

            <div className="field-container">
                <label htmlFor="coursePrice">Course Price</label>
                <input
                    id="coursePrice"
                    type="number"
                    placeholder="Enter Course Price"
                    value={formData.coursePrice}
                    onChange={(e) => setFormData({ ...formData, coursePrice: e.target.value })}
                    required={mode !== 'view'}
                    disabled={mode === 'view'}
                    min="0"
                />
            </div>

            <div className="field-container">
                <label htmlFor="teacher">Select a Teacher</label>
                <select
                    id="teacher"
                    value={formData.teacher || ""}
                    onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                    required={mode !== 'view'}
                    disabled={mode === 'view'}
                >
                    <option value="" disabled>Select a Teacher</option>
                    {teachers.length > 0 ? (
                        teachers.map((teacher) => (
                            <option key={teacher._id} value={teacher._id}>
                                {teacher.teacherName}
                            </option>
                        ))
                    ) : (
                        <option className="loading" disabled>Loading teachers...</option>
                    )}
                </select>
            </div>

            {error && <p className="error">{error}</p>}

            {mode !== 'view' && (
                <button type="submit">
                    {mode === 'create' ? 'Create Course' : 'Update Course'}
                </button>
            )}
        </form>
    );
};

export default CourseForm;
