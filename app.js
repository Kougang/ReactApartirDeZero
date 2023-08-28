// let n = 0

// // function render ()
// // {
// //     const title = React.createElement('h1',{}, 'salut tout le monde-', 
// //     React.createElement('span',{}, n)

// // )

// function numberFormat()
// {
//     return n.toString().padStart(2,'0')
// }


// function render ()
// {
//     const items =
//     [
//         'tache1',
//         'tache2',
//         'tache3'


//     ]

//     const lis = items.map((item,k) => <li key={k}>{item} {k}</li>)


//     const title = 
//     <div id='app'>
    
//         <h1  className='title' id='title'>
//         bonjour les gens
//         <span> {n%2 ? numberFormat(n) : null} </span>
//         </h1>

//         <ul>

//             <li>{lis}</li>
        
//         </ul>

//     </div>


// ReactDOM.render(title, document.querySelector('#app'))


// }

// // function render()
// // {
// // document.querySelector('#app').innerHTML = "<h1>bonjour tout le monde <span>"+ n +"</span></h1>"

// // }
// window.setInterval(()=>{
//     n++
//     render()
// },1000)
class ManualIncrementer extends React.Component
{
constructor(props)
{
    super(props)
    this.state = {n:0}
}

increment(e)
{
    e.preventDefault()
    this.setState((state, props)=>({n: state.n +1}))
}
render()
{
    return <div>
       valeur: {this.state.n}
       <button onClick={this.increment.bind(this)}>Incrementer</button>
    </div>
}

}



function WelcomeFunc({name , children})
{
    return         <div>
    <h1>
    bonjour {name}
    </h1>

    <p>
        {children}
    </p>

</div>

}
// ReactDOM.render(<WelcomeFunc name ="jean"> bonjour tout le monde </WelcomeFunc>, document.querySelector('#app'))




class  Welcome extends React.Component
{
    // constructor(props)
    // {
    //     super(props)

    // }

    render()
    {

        return         <div>
        <h1>
        bonjour {this.props.name}
        </h1>
    </div>
    }
}
// ReactDOM.render(<Welcome name ="jean"> bonjour tout le monde </Welcome>, document.querySelector('#app'))


class Clock extends React.Component 
{
    constructor(props)
    {
        super(props)
        this.state = {date: new Date()}
        this.timer = null
    }

    componentDidMount() {
    console.log(" dans didMount timer")


    this.timer = window.setInterval(this.tick.bind(this),1000)

}

componentWillUnMount(){
    window.clearInterval(this.timer)

}

tick()
{
    this.setState({date: new Date()})
}

    render()
    {
        const date = new Date()

        return <div>
                il est {this.state.date.toLocaleDateString()} {this.state.date.toLocaleTimeString()}
            </div>
    }
}

class Incrementer extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {n:props.start, timer:null};
        this.toggle = this.toggle.bind(this)
        this.reset = this.reset.bind(this)

    }

    componentDidMount()
    {
        this.play();
    }

    componentWillUnmount()
    {
        window.clearInterval(this.state.timer) 
    }

    increment()
    {      
        this.setState((state,props)=>{
            return {n:this.state.n + props.step}
        });
    }
    pause()
    {     
        window.clearInterval(this.state.timer)
        this.setState({
            timer:null
        })
        console.log("dans pause")
    }

    play()
    {
        window.clearInterval(this.state.timer)
        this.setState({
            timer:window.setInterval(this.increment.bind(this),1000)
        })
    }

    toggle()
    {
      return this.state.timer ? this.pause() : this.play()
    }

    label()
    {
       return this.state.timer ? 'Pause' : 'Play'
    }

    reset()
    {

        this.pause()
        this.play()
        this.setState((state,props)=>{
            return {n:props.start}
        });    }

render()
{
    return <div>
    valeur:{this.state.n}
    <button onClick={this.toggle}>{this.label()}</button>
    <button onClick={this.reset}>Reset</button>


    </div>
}
}

Incrementer.defaultProps = {
    start: 0,
    step:1
}





function Home ()
{

    return <div>
                <Welcome name="roch"/>
                <Welcome name="alex"/>
                <Clock/>
                <Incrementer start={10} />
                <Incrementer start={100} step={10} />
        
            </div>


}
ReactDOM.render(<Home/>, document.querySelector('#app'))




