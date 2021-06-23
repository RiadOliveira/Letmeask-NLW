import { useCallback } from 'react';
import copyImg from '../assets/images/copy.svg';

import '../styles/room-code.scss';

interface RoomCodeProps {
    code: string;
}

const RoomCode = (props: RoomCodeProps) => {
    const copyRoomCodeToClipboard = useCallback(() => {
        navigator.clipboard.writeText(props.code);
    }, [props.code]);

    return (
        <button onClick={copyRoomCodeToClipboard} className="room-code">
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>Sala {props.code}</span>
        </button>
    );
}

export default RoomCode;