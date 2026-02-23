import React from 'react';
import { simulateLeaderboard, updateLeaderboard, getLeaderboard } from '../service';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';
export function Leaderboard() {
    const { userName } = useUser();
    const [leaderboard, setLeaderboard] = React.useState([]);
    const { points } = useUser();
    const { currentPage } = useUser();
    const navigate = useNavigate();
    const [messageboard, setMessageboard] = React.useState([]);

    function addMessage(message) {
        let newMessageboard = messageboard;
        newMessageboard.push(message);  
        if (newMessageboard.length > 10) {
            newMessageboard.shift();
        }
        setMessageboard(newMessageboard);
    }


    React.useEffect(() => {
        setLeaderboard(simulateLeaderboard());
    }, [currentPage]);



    React.useEffect(() => {
        let interval = null;
        if (currentPage === 'authenticated') {
        interval = setInterval(() => {
            
            const lb = getLeaderboard();
                if (lb.length > 0) {
                    let length = lb.length;
                    let randomIndex = Math.floor(Math.random() * length);
                    let randomUser = lb[randomIndex];
                    if (randomUser.username === userName) {
                        return;
                    } else {
                        randomUser.points += Math.floor(Math.random() * 50);
                        randomUser.streak += 1;
                        let pointsDelta = randomUser.points - points;
                        let message = "Leaderboard updated! " + randomUser.username + " now has a score of " + randomUser.points + ". They are now " + (pointsDelta > 0 ? "ahead of" : "behind") + " you by " + Math.abs(pointsDelta) + " points";   
                        addMessage(message);
                        updateLeaderboard(randomUser.username, randomUser.points, randomUser.streak);
                        setLeaderboard(getLeaderboard());
                    }
                }
            }, Math.floor(Math.random() * 1000)+5000);
        } else {
            clearInterval(interval);
        }
        
    }, [currentPage]);


  return (
        <main className="container py-4 flex-grow-1 flex-shrink-1">
            <fieldset>
                <legend className="text-decoration-underline display-6">Leaderboard</legend>
                <div className="bg-danger bg-opacity-25 border rounded-3 px-3 pt-3 mb-3">
                    <h5 >Note: </h5>
                    <p>Scores are based off of the total points, not based off of the streak. The leaderboard will automatically adjust when the rankings change as a result of a change in a users score.</p>
                </div>
                <table className="table table-success table-striped shadow border border-success">
                    <thead>
                        <tr className="bg-success bg-opacity-50">
                            <th scope="col">Rank</th>
                            <th scope="col">Name</th>
                            <th scope="col">Score</th>
                            <th scope="col">Streak</th>
                        </tr>
                    </thead>
                    <tbody>
                     {leaderboard.sort((a, b) => b.points - a.points).map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.points}</td>
                            <td>{user.streak} {user.streak === 1 ? "Day" : "Days"}</td>
                        </tr>
                     ))}   
                    </tbody>
                </table>
            </fieldset>
            <div className="bg-secondary bg-opacity-25 border rounded-3 px-3 pt-3 mb-3">
                    <h5 >Messageboard: </h5>
                    <p>The leaderboard will automatically adjust when the rankings change as a result of a change in a users score.</p>
                    
                        {messageboard.map((message, index) => (
                            <div key={index} className="bg-white border rounded-3 px-3 py-3 mb-3"> 
                                <h6>Message {index + 1} ⚠️:</h6>
                                <p>{message}</p> 
                            </div>
                        ))}
                    
            </div>
        </main>
  );
}