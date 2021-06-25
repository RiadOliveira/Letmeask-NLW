import React, { useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import logoImg from '../../assets/images/logo.svg';
import Button from '../../components/Button';
import RoomCode from '../../components/RoomCode';
import Question from '../../components/Question';
import useRoom from '../../hooks/useRoom';

import deleteImg from '../../assets/images/delete.svg';
import checkImg from '../../assets/images/check.svg';
import answerImg from '../../assets/images/answer.svg';

import './styles.scss';
import { database } from '../../services/firebase';

interface RoomParams {
    id: string;
}

const AdminRoom: React.FC = () => {
    const { id: roomId } = useParams<RoomParams>();
    const { questions, title } = useRoom(roomId);
    const history = useHistory();

    const handleCheckQuestionAsAnswered = useCallback(
        async (questionId: string) => {
            const questionRef = database.ref(
                `rooms/${roomId}/questions/${questionId}`,
            );

            await questionRef.update({
                isAnswered: true,
            });
        },
        [roomId],
    );

    const handleHighlightQuestion = useCallback(
        async (questionId: string) => {
            const questionRef = database.ref(
                `rooms/${roomId}/questions/${questionId}`,
            );

            await questionRef.update({
                isHighlighted: true,
            });
        },
        [roomId],
    );

    const handleDeleteQuestion = useCallback(
        async (questionId: string) => {
            if (
                window.confirm('Tem certeza que deseja excluir essa pergunta?')
            ) {
                const questionRef = database.ref(
                    `rooms/${roomId}/questions/${questionId}`,
                );

                await questionRef.remove();
            }
        },
        [roomId],
    );

    const handleEndRoom = useCallback(async () => {
        await database.ref(`/rooms/${roomId}`).update({
            endedAt: new Date(),
        });

        history.push('/');
    }, [roomId, history]);

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button onClick={handleEndRoom} isOutlined>
                            Encerrar sala
                        </Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && (
                        <span>
                            {questions.length} pergunta
                            {questions.length > 1 && 's'}
                        </span>
                    )}
                </div>

                <div className="question-list">
                    {questions.map(question => (
                        <Question {...question} key={question.id}>
                            {!question.isAnswered && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleCheckQuestionAsAnswered(
                                                question.id,
                                            )
                                        }
                                    >
                                        <img
                                            src={checkImg}
                                            alt="Marcar como respondida"
                                        />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleHighlightQuestion(question.id)
                                        }
                                    >
                                        <img
                                            src={answerImg}
                                            alt="Destacar pergunta"
                                        />
                                    </button>
                                </>
                            )}

                            <button
                                type="button"
                                onClick={() =>
                                    handleDeleteQuestion(question.id)
                                }
                            >
                                <img src={deleteImg} alt="Remover pergunta" />
                            </button>
                        </Question>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AdminRoom;
