import { Lottie } from '@crello/react-lottie';
// import db from '../../../db.json';
import Widget from '../../components/Widget';
import QuizLogo from '../../components/QuizLogo';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import AlternativesForm from '../../components/AlternativesForm';
import Button from '../../components/Button';
import BackLinkArrow from '../../components/BackLinkArrow';
import {useRouter} from 'next/router'; 

import loadingAnimation from './animations/loading.json';

function ResultWidget({ results }) {
  const router = useRouter();
  const name = router.query.name;
  return (
    <Widget>
      <Widget.Header>
        <h3>
          {((results.filter((x) => x).length)>3) ?
            `😀 Mandou bem, ${name}!`
            : `😬 Poxa ${name}, melhor assistir novamente!`  
          }
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={((results.filter((x) => x).length)>3) ? 
          "https://media.giphy.com/media/MSS0COPq80x68/giphy.gif"
          : "https://media.giphy.com/media/UsSjjcZzUhZ1Su5pjD/giphy.gif"
        }
      />

      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {results.filter((x) => x).length}
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              #
              {index + 1}
              {' '}
              : 
              {result === true
                ? 'Acertou'
                : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content style={{ display: 'flex', justifyContent: 'center' }}>
        <Lottie
          width="200px"
          height="200px"
          className="lottie-container basic"
          config={{ animationData: loadingAnimation, loop: true, autoplay: true }}
        />
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  countQuestion,
  finalQuestion,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  function alternativesFormOnSubmit(infosDoEvento){
    infosDoEvento.preventDefault();
    setIsQuestionSubmited(true);
    setTimeout(() => {
      addResult(isCorrect);
      setIsQuestionSubmited(false);
      setSelectedAlternative(undefined);
      onSubmit();
    }, 3 * 1000);
  }

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${countQuestion + 1} de ${finalQuestion}`}
          {' '}
          {`#00${questionIndex + 1}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={ (infosDoEvento)=>{alternativesFormOnSubmit(infosDoEvento)} }
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={(e) => {
                    e.target.checked = false;
                    setSelectedAlternative(alternativeIndex)
                  }}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function QuizPage({ externalQuestions, externalBg }) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = externalQuestions.length;

  const bg = externalBg;
  const firstQuestion = Math.floor(Math.random()*totalQuestions);
  const [questionData, setQuestionData] = React.useState({ questionsAsked: [firstQuestion], countQuestion: 0, currentQuestion: firstQuestion });
  const questionIndex = questionData.currentQuestion;
  const question = externalQuestions[questionIndex];
  const finalQuestion = 5;
  
  function addResult(result) {
    // results.push(result);
    setResults([
      ...results,
      result,
    ]);
  }

  // [React chama de: Efeitos || Effects]
  // React.useEffect
  // atualizado === willUpdate
  // morre === willUnmount
  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 2000);
  // nasce === didMount
  }, []);

  function handleSubmitQuiz() {
    let nextQuestion;
    const nextCountQuestion = questionData.countQuestion + 1;
    if (nextCountQuestion < finalQuestion) {
      do{
        nextQuestion = Math.floor(Math.random()*totalQuestions);
        console.log(questionData.questionsAsked,nextQuestion)
      }while(questionData.questionsAsked.filter((x)=>(x==nextQuestion)).length != 0 )
    
      setQuestionData({
        countQuestion: nextCountQuestion,
        questionsAsked: [...questionData.questionsAsked, nextQuestion],
        currentQuestion: nextQuestion
      });
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            countQuestion={questionData.countQuestion}
            finalQuestion={finalQuestion}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}