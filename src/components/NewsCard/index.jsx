import styles from './NewsCard.module.css';
import React,{ useState } from 'react';

const truncateChar = (text) => {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        if(i < 150) {
            result += text[i];
        }else {
            break;
        }
    }

    return `${result}..`;
}

function NewsCard(props) {
    const { headline,  abstract,  source, author, onSave, onRemove, onViewNewDetail} = props;
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        if (isSaved) {
            onRemove();
        } else {
            onSave();
        }
        setIsSaved(!isSaved);
    };
    return (
        <section className={styles.newsCard}>
            <h3>{source}</h3>
            <h1>{headline}</h1>
            <h4>{author}</h4>
            <p>{truncateChar(abstract)}</p>
            <div className={styles.buttonContainer}>
            <button className={styles.newsPageButton} onClick={onViewNewDetail}>
                    News Page
            </button>
            <button className={styles.saveButton} onClick={handleSave}>
                {isSaved? 'Unsave' : 'Save'}
            </button>
        </div>
        </section>
    )
}

export { NewsCard }