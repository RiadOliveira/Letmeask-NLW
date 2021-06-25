import React from 'react';
import emptyQuestions from '../../assets/images/empty-questions.svg';

import './styles.scss';

const NoQuestions: React.FC = () => {
    return (
        <div id="container">
            <h2>Sem perguntas cadastradas</h2>
            <img src={emptyQuestions} alt="No questions available" />
        </div>
    );
};

export default NoQuestions;
