import React, { 
  useState 
} from 'react';
import { Container, Row, Col, Button, Badge, Stack } from 'react-bootstrap';
import { useDeleteIdeaMutation } from '../slices/ideaApiSlice'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addToPlanIdeas, removeFromPlanIdeas } from '../slices/planIdeasSlice';


const IdeaList = ({ props }) => {

  const dispatch = useDispatch();

  const { planIdeas } = useSelector((state) => state.planIdeas);

  const addToPlanIdeasHandler = async (idea) => {
    dispatch(addToPlanIdeas({ ...idea }));
  };

  const removeFromPlanIdeasHandler = (id) => {
    dispatch(removeFromPlanIdeas(id));
  };

  const ideas = props?.data?.ideas;
  let [version, setVersion] = useState(1);
  let selected = [...planIdeas] || [];

  const [deleteIdea] =
  useDeleteIdeaMutation();

  const deleteIdeaHandler = async (id, e) => {
    e.preventDefault();
    try {
      await deleteIdea(id);
      toast.success(id + ' Idea deleted');
      props.refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  const selectIdeaHendler = (idea, e) => {
    const selectedIndex = selected.findIndex(s => s._id === idea._id);
    if (selectedIndex < 0) {
      selected.push(idea);
      addToPlanIdeasHandler(idea);

    } else {
      selected.splice(selectedIndex, 1);
      removeFromPlanIdeasHandler(idea._id);
    }
    setVersion(version + 1);
  }

  const isSelected = (idea) => {
    return !!selected.find(s => s._id === idea._id);
  }

  return (
      <div className="p-2">
        <Row className='justify-content-md-center'>
        {ideas?.map((idea) => (
                <Col className="align-self-center mx-auto" key={idea?._id} >
                  <Button className="rounded-pill m-1 text-nowrap" onClick={(e) => selectIdeaHendler(idea, e)} active={isSelected(idea)}>
                    <Stack direction="horizontal">
                      <div className="px-1">{idea?.keyword} </div>
                      <Badge bg="warning" className="rounded-pill text-white" 
                      onClick={(e) => deleteIdeaHandler(idea?._id, e)}>x</Badge>
                    </Stack>
                  </Button>
                </Col>
              ))}
        </Row>
      </div>
  );
};

export default IdeaList;
