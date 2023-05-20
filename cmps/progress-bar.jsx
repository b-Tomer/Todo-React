
const { useSelector } = ReactRedux


export function ProgressBar() {

    const progress = useSelector((storeState) => storeState.progress)
    


    return (

        <div className="progress-bar">
            <h1>Progress: {progress}%</h1>
        </div>
    )
}

