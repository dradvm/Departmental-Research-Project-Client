"use client";

import CourseAnswers from "components/Course/CourseDetails/CourseQA/Answer/CourseAnswers";
import { useState } from "react";
import Question from "types/question";
import CourseQuestions from "./CourseQuestionsIns";

export default function CourseQAInstructor({ courseId }: { courseId: string }) {
    const [question, setQuestion] = useState<Question | null>(null);

    return (
        <div className="flex justify-around">
            {question === null ? (
                <CourseQuestions
                    setQuestion={setQuestion}
                    setIsAsk={() => { }}
                    forceCourseId={courseId}
                    forceAllLectures={true}
                />
            ) : (
                <CourseAnswers question={question} setQuestion={setQuestion} />
            )}
        </div>
    );
}
