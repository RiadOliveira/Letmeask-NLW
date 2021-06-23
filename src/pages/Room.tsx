import logoImg from '../assets/images/logo.svg';
import Button from '../components/Button';
import RoomCode from '../components/RoomCode';

import { useParams } from 'react-router-dom';

import '../styles/room.scss';
import { FormEvent, useCallback } from 'react';
import { useState } from 'react';
import { useAuth } from '../hooks/auth';
import { database } from '../services/firebase';
import { useEffect } from 'react';

interface RoomParams {
    id: string;
}

interface Question {
    id: string;
    author: {
        name: string;
        avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}

type FireBaseQuestion = Record<string, Omit<Question, 'id'>>

const Room = () => {
    const { user } = useAuth();
    const { id: roomId } = useParams<RoomParams>();

    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const roomRef = database.ref(`/rooms/${roomId}`);

        roomRef.on('value', room => {
            const firebaseQuestions: FireBaseQuestion = room.val().questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions);

            setTitle(room.val().title)
            setQuestions(parsedQuestions.map(([key, value]) => ({
                id: key,
                ...value,
            })));
        })
    }, [roomId]);

    const handleSendQuestion = useCallback(async (event: FormEvent) => {
        event.preventDefault();

        if(newQuestion.trim() === '') {
            return;
        }

        if(!user) {
            throw new Error('You must be logged in.');
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false,
        }

        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion('');
    }, [newQuestion, user, roomId]);

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <RoomCode code={roomId}/>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && (
                        <span>{questions.length} pergunta{questions.length > 1 && 's'}</span>
                    )}
                </div>

                <form onSubmit={(event) => handleSendQuestion(event)}>
                    <textarea
                        placeholder="O que você quer perguntar?"
                        value={newQuestion}
                        onChange={(event) => setNewQuestion(event.target.value)}
                    />

                    <div className="form-footer">
                        {user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
                        )}
                        <Button disabled={!user} type="submit">Enviar pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default Room;