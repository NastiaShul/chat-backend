import { useState, useEffect } from 'react';

export const useFormattedDate = (dateString) => {
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const date = new Date(dateString);
        const months = [
            'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'
        ];

        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        let hours = date.getHours();
        const minutes = date.getMinutes();

        let ampm = 'am';
        if (hours > 12) {
            hours -= 12;
            ampm = 'pm';
        }

        const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}${ampm}`;
        setFormattedDate(`${month} ${day}, ${year} ${formattedTime}`);
    }, [dateString]);

    return formattedDate;
};
