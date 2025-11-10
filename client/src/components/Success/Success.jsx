import React from "react";

const Success = ({ isSuccess, attempt }) => {
    return (
        <div>
                {
                    (() => {
                        if(!isSuccess && attempt === 0) {
                            return null;
                        }
                        if (isSuccess === true) {
                            return (
                                <>
                                    <h2>Your OTP was successful.</h2>
                                    <p>The number you entered was correct. Thank you!</p>
                                </>
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