import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuestion } from './services/questionnaire-service';

export default function Question() {
    const { id } = useParams();
    const question = getQuestion(id);
    return (
        <div id="question">
          <h1>{question.text}</h1>
          { question.options.map(o => (
              <div>{o.text}</div>
          ))}
        </div>
      );
}