const scaleNames={
  c:'celsius',
  f:'fahrenheit'
}

function toCelsius(farenheit)
{
  return ((farenheit-32)*5/9)
}

function toFahrenheit(celsius)
{
  return((celsius*9/5) + 32)
}


function BoilingVerdict({celsius}) {

  if(celsius>=100){
    // console.log("dans 100")
    return <div className = "alert alert-info" >bouillante</div>;
  }
    // console.log("dans moins de  100")

    return <div className = "alert alert-success" >pas bouillante</div>;
}

function tryConvert(temperature, convert)
{
  const value = parseFloat(temperature)

  if(Number.isNaN(value))
  {
    // isNaN veut dire is not a numeric 
    return '';
  }
  return (Math.round(convert(value)*100)/100).toString()

}


class TemperatureInput extends React.Component {

    constructor(props)
    {
      super(props)
      // this.state = {
      //   temperature: ''
      // }
      this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e)
    {
      this.props.onTemperatureChange(e.target.value)
      // console.log("dans tempera input")  

    }


  render() {
    const {temperature} = this.props
    const name = 'scale' + this.props.scale
    const scaleName = scaleNames[this.props.scale]
    
    return (
      <div>
        <label htmlFor={name}> temperature en {scaleName}</label>
        <input type="text" id={name} value ={temperature} className="form-control" onChange = {this.handleChange}></input>
      </div>
    )
  }
}

function Button ({type, children})
{
  const className='btn btn-' + type

  return <button className={className}>{children}</button>
}

function primaryButton({children})
{
  return <Button type="primary">{children}</Button>
}

function secondaryButton({children})
{
  return <Button type="secondary">{children}</Button>
}

function Column2({left,right})
{

    return <div className='row'>
    <div className='col-md-6'>{left}</div>
    <div className='col-md-6'>{right}</div>
    
    </div>


}



class Calculator extends React.Component {

    constructor(props)
    {
      super(props)
      this.state = {
        scale: 'c',
        temperature : 20
      }
      // this.handleChange = this.handleChange.bind(this),
      this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
      this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)

    }

  /*  handleChange(e)
    {
      this.setState({temperature: e.target.value})
      console.log(e.target.value)  
    }*/
  
    handleCelsiusChange(temperature)
    {
        this.setState({
          scale : 'c',
          temperature
        })
      
    }

    handleFahrenheitChange(temperature)
    {
      this.setState({
        scale : 'f' ,
        temperature 
      })
    }

  render() {
    const {temperature, scale} = this.state
    const celsius =scale==='c' ? temperature:    tryConvert(temperature,toCelsius)  
    const farenheit =scale==='f' ? temperature : tryConvert(temperature,toFahrenheit)   
    return(
      <div>
        {/*<div className="form-group">
          <label htmlFor="celcius" > Temperature (en Celcius)</label>
          <input type = "text" id="celcius" className="form-control" value = {temperature} onChange={this.handleChange}/>
    </div>*/}
          <Column2
          left={<TemperatureInput scale="c" temperature={celsius}  onTemperatureChange = {this.handleCelsiusChange}   />
            }
            right={<TemperatureInput scale="f" temperature={farenheit}  onTemperatureChange = {this.handleFahrenheitChange}/>
          }
          />

        <BoilingVerdict   celsius={parseFloat(temperature)}/>
        <Button type = 'primary'>Envoyer</Button>


    </div>
    )

  }
}




ReactDOM.render(<Calculator/>, document.querySelector('#app'));



