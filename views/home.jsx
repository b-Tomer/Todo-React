const { useSelector } = ReactRedux
export function Home() {
    const userStyle = useSelector((storeState) => storeState.userStyle)

    return <section style={userStyle} className="home">
        <h1>Home</h1>
        {/* <img src="assets/img/bg.jpg" alt="" /> */}
    </section>
}