import React from 'react';

export function Leaderboard() {
  return (
<main className="container py-4 flex-grow-1 flex-shrink-1">
            <fieldset>
                <legend className="text-decoration-underline display-6">Leaderboard</legend>
                <div className="bg-danger bg-opacity-25 border rounded-3 px-3 pt-3 mb-3">
                    <h5>Note: </h5>
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
                        <tr>
                            <td>1</td>
                            <td>OutDailyPro</td>
                            <td>1000</td>
                            <td>60 Days</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>TreeHugger</td>
                            <td>800</td>
                            <td>50 Days</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Bill</td>
                            <td>300</td>
                            <td>20 Days</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>BestHiker26</td>
                            <td>120</td>
                            <td>9 Days</td>
                        </tr>
                    </tbody>
                </table>
            </fieldset>
        </main>
  );
}