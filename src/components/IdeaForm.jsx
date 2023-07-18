import React, { 
    useState 
} from 'react';
import { Form, Button, Container, Row, Col, Stack } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { useCreateIdeaMutation } from '../slices/ideaApiSlice';
import { toast } from 'react-toastify';

const IdeaForm = ({props}) => {

  const [idea, setIdea] = useState('');


  const [createIdea] =
    useCreateIdeaMutation();

    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        await createIdea({
          keyword: idea,
        });
        toast.success(idea + ' Idea created');
        props.refetch();
        setIdea('');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };

  return (

            <Form onSubmit={submitHandler} className='d-flex my-2'>
              <Form.Control
                type='text'
                name='q'
                onChange={(e) => setIdea(e.target.value)}
                value={idea}
                placeholder='Ideas...'
                className='mr-sm-2 ml-sm-5'
              ></Form.Control>
              <Button type='submit' variant='outline-info' className='p-2 mx-2 text-nowrap'>
                New Idea
              </Button>
            </Form>

  );
};

export default IdeaForm;
