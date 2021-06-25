import { ReactNode } from 'react';
import setClasses from 'classnames';
import './styles.scss';

interface QuestionProps {
    content: string;
    author: {
        name: string;
        avatar: string;
    }
    children?: ReactNode;
    isHighlighted?: boolean;
    isAnswered?: boolean;
}

const Question = ({
    content, 
    author, 
    children, 
    isHighlighted = false, 
    isAnswered = false
}: QuestionProps) => (
    <div 
    className={
        setClasses('question', 
        {answered: isAnswered, highlighted: isHighlighted && !isAnswered})}
    >
        <p>{content}</p>

        <footer>
            <div className="user-info">
                <img src={author.avatar} alt={author.name} />
                <span>{author.name}</span>
            </div>

            <div>{children}</div>
        </footer>
    </div>
);


export default Question;