function ElectionCard({ name, status }) {

    return (
        <div>
            <h3>{name}</h3>
            <p>Status: {status}</p>
            <button>View Election</button>
        </div>
    );

}

export default ElectionCard;