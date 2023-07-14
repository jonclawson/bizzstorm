import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetIdeasQuery } from '../slices/ideaApiSlice';
import { useGetPlansQuery } from '../slices/planApiSlice';
import IdeaForm from '../components/IdeaForm';
import IdeaList from '../components/IdeaList';
import PlanList from '../components/PlanList';
import PlanForm from '../components/PlanForm';
import { useSelector } from 'react-redux';

const HomeScreen = () => {

  const { pageNumber, keyword } = useParams();
  const { planIdeas } = useSelector((state) => state.planIdeas);

  const ideasResponse = useGetIdeasQuery({
    keyword,
    pageNumber,
  });


  const planResponse = useGetPlansQuery({
    keyword,
    pageNumber,
  });



  return (
    <>
    <Row>
      <Col >
        <IdeaForm props={ideasResponse} ></IdeaForm>
        <IdeaList props={ideasResponse} > </IdeaList>
      </Col>
      {
        planResponse?.data?.plans?.length || planIdeas?.length ?
        (
        <Col sm={6}>
        {
          planIdeas?.length ?
          (<PlanForm props={planResponse}></PlanForm>)
          : ''
        }
        {
          !!planResponse?.data?.plans?.length && (<PlanList props={planResponse}  ></PlanList>)
        }
          
        </Col>
        ) : ''
      }
    </Row>
    </>
  );
};

export default HomeScreen;
