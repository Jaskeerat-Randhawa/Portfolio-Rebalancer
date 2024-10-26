const updateGoalHoldings = async (goalHoldings) => {
    const accountId = 1; // Assuming you want to update for this account ID
    console.log(goalHoldings.data); 
    try {
        const response = await fetch(`http://localhost:8080/goal/update/${accountId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
           body: JSON.stringify({
                title: 'React PUT Request Example',
                holdings: goalHoldings.data
            }),
            credentials: 'include'
        });

        // Check if the response is OK (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Assuming the server responds with JSON
        console.log("Update successful:", data);
    } catch (error) {
        console.error("Error updating goal holdings:", error);
    }
};


export {updateGoalHoldings}
