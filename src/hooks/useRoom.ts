import { useEffect, useState } from 'react';
import { database } from '../services/firebase';
import { useAuth } from './authContext';

interface QuestionType {
    id: string;
    author: {
        name: string;
        avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likesQuantity: number;
    likeId?: string;
}

type FireBaseQuestion = {
    [key: string]: Omit<QuestionType, 'id'> & {
        likes: {
            [key: string]: {
                authorId: string;
            };
        };
    };
};

interface UseRoomReturn {
    questions: QuestionType[];
    title: string;
}

const useRoom = (roomId: string): UseRoomReturn => {
    const { user } = useAuth();

    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const roomRef = database.ref(`/rooms/${roomId}`);

        roomRef.on('value', room => {
            const firebaseQuestions: FireBaseQuestion =
                room.val().questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions);

            setTitle(room.val().title);

            setQuestions(
                parsedQuestions.map(([key, value]) => ({
                    id: key,
                    ...value,
                    likesQuantity: Object.keys(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(
                        ([, likeValue]) => likeValue.authorId === user?.id,
                    )?.[0],
                })),
            );
        });

        return () => {
            roomRef.off('value');
        };
    }, [roomId, user]);

    return { questions, title };
};

export default useRoom;
