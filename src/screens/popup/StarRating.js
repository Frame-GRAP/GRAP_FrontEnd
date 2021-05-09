import React, {useState, useEffect} from 'react'
import './StarRating.css'
import { FaStar, FaStarHalf, FaStarHalfAlt } from 'react-icons/fa'

function StarRating({starRatingNum}) {
    const [hover, setHover] = useState(null);
    const bool = Math.round(starRatingNum)===starRatingNum;
    const roundValue = Math.floor(starRatingNum);

    return (
        <div className="Star">
            {bool ? (
                <div>
                    {[...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;    


                        return (
                            <FaStar
                                color={ratingValue <= (starRatingNum || hover) ? "#ffc107" : "#e4e5e9"}
                                size={15} 
                            />
                            
                        );
                    })}
                </div>
            ) : (
                <div>
                    {[...Array(roundValue)].map((star, i) => {
                        return (
                            <FaStar
                                color="#ffc107"
                                size={15} 
                            />
                        );
                    })}
                    <FaStarHalf size={15} color="#ffc107" />
                </div>
            )}


        </div>
    )
}

export default StarRating
