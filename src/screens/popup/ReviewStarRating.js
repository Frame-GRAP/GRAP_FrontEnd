import React, {useState} from 'react'
import { FaStar } from 'react-icons/fa'

function ReviewStarRating({rating, setRating}) {
    const [hover, setHover] = useState(null);

    return (
        <div className="Star">
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;    

                return (
                    <label>
                        <input 
                            type="radio" 
                            name="rating" 
                            className="star__radio"
                            value={ratingValue} 
                            onClick={()=> {
                                setRating(ratingValue);
                            }}
                        />
                        <FaStar
                            className="star" 
                            color={ratingValue <= (rating || hover) ? "#ffc107" : "#e4e5e9"} 
                            size={20} 
                            onMouseEnter={()=>setHover(ratingValue)}
                            onMouseLeave={()=>setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    )
}

export default ReviewStarRating
