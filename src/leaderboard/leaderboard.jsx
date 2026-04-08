import React from 'react';
import { GameNotifier } from '../gameNotifier';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';
export function Leaderboard() {
    const { username, currentPage, points } = useUser();
    const [ leaderboard, setLeaderboard] = React.useState([]);
    const navigate = useNavigate();
    const [messageboard, setMessageboard] = React.useState([]);
    const [listOfScores, setListOfScores] = React.useState([]);
    const [messageNumber, setMessageNumber] = React.useState(1);

    function incrementMessageNumber() {
        setMessageNumber(prev => prev + 1);
    }

    function addMessage(message) {
        setMessageboard(messageboard => [...messageboard, message]);
        incrementMessageNumber();
    }

    function addScore(event) {
        setListOfScores(prev => prev.length >= 10 ? [...prev.slice(1), event] : [...prev, event] );
    }

    async function getScores() {
        const res = await fetch('/api/scores');
        const data = await res.json();
        setLeaderboard(data.scores);
    }

    React.useEffect(() => {
        GameNotifier.addHandler(addScore);
    
        return () => {
          GameNotifier.removeHandler(addScore);
        };
      }, []);

    React.useEffect(() => {
        getScores();
    }, [currentPage, points, listOfScores]);

    React.useEffect(() => {
        if (currentPage === 'authenticated') {
            for (const event of listOfScores) {
                const pointsDelta = event.score - points;
                const message = "Leaderboard updated! " + event.from + " now has a score of " + event.score + ". They are now " + (pointsDelta > 0 ? "ahead of" : "behind") + " you by " + Math.abs(pointsDelta) + " points";   
                addMessage(message);
            }
        }
    }, [listOfScores]);


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
                     {[...leaderboard].sort((a, b) => b.points - a.points).map((user, index) => (
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
                    
                        {messageboard.map((message, index) => {
                            return (
                                <div key={index} className="bg-white border rounded-3 px-3 py-3 mb-3"> 
                                    <h6>Message {messageNumber - (messageboard.length - index)} ⚠️:</h6>
                                    <p>{message}</p> 
                                </div>
                            )
                        })}
                    
            </div>
        </main>
  );
}