import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png';
import {levels, calculateImc, level} from './helpers/imc';
import {GridItem} from './components/GridItem/index'



function App() {

  const [heightField, setHightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);

  const [toShow, setToShow] = useState<level | null> (null);
 
  const handleCalculateButton =() => {
    if(heightField && weightField){
      setToShow(calculateImc(heightField, weightField));

    } else{
      alert('Digite todos os campos');
    }
  }

  const handleBackButton = () =>{
    setToShow(null);
    setHightField(0);
    setWeightField(0);
  }
  

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt=""  width={150}/>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule seu IMC.</h1>
          <p>O IMC (Índice de Massa Corporal) é um cálculo que ajuda a avaliar se a pessoa está dentro do seu peso ideal, de acordo com a altura.</p>

          <input
            type='number'
            placeholder='Digite a sua altura.  Ex: 1.5, (em métros)'
            value={heightField > 0 ? heightField : ''}
            onChange={e => setHightField(parseFloat(e.target.value))}
            disabled = {toShow ? true : false}
          />

          <input
            type='number'
            placeholder='Digite o seu peso.  Ex: 75.3, (em kg)'
            value={weightField > 0 ? weightField: ''}
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled = {toShow ? true : false}
          />

          <button onClick={handleCalculateButton} disabled = {toShow ? true : false}>Calcular</button>
        </div>
        <div className={styles.rightSide}>

          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item, key)=>(
                <GridItem key={key} item={item}/>
              ))}
            </div>
          }
          {toShow &&
          <div className={styles.rightBig}>
            <div className={styles.rightArrow} onClick={handleBackButton}>
              <img src={leftArrowImage} alt=""width={25}/>
            </div>
            <GridItem item={toShow}/>
          </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
