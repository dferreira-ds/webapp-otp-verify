import React from "react";

const Success = ({ isSuccess, attempt }) => {
    return (
        <div>
                {
                    (()=> {
                        if(isSuccess === false && attempt === 0) {
                            return null
                        }
                        if (isSuccess === true) {
                            return (
                                <p>Succeeded!</p>
                            )
                        }
                        if (isSuccess === false && attempt > 0) {
                            return (
                                <p>Try again!</p>
                            )
                        }
                    })()
                }
        </div>
    )
};

export default Success;