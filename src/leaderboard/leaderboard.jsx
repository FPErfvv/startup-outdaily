import React from 'react';
import { simulateLeaderboard, updateLeaderboard } from '../service';
import { useUser } from '../UserContext';
export function Leaderboard() {
    const { userName } = useUser();
    const [leaderboard, setLeaderboard] = React.useState([]);
    const { points } = useUser();
    const { streak } = useUser();
    React.useEffect(() => {
        setLeaderboard(simulateLeaderboard());
    }, []);

  return (
        <main className="container py-4 flex-grow-1 flex-shrink-1">
            <fieldset>
                <legend className="text-decoration-underline display-6">Leaderboard</legend>
                <div className="bg-danger bg-opacity-25 border rounded-3 px-3 pt-3 mb-3">
                    <h5 onClick={() => console.log(leaderboard)}>Note: </h5>
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
        </main>
  );
}