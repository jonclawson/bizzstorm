
import React, { 
    useState 
} from 'react';
import { Form, Button, Badge, Row, Stack, Container, Col } from 'react-bootstrap';
import { useCreatePlanMutation } from '../slices/planApiSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { clearPlanIdeas } from '../slices/planIdeasSlice';
import { useNavigate } from 'react-router-dom';



const PlanForm = ({props}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { planIdeas } = useSelector((state) => state.planIdeas);

    let [name, setName] = useState('');
    let [description, setDescription] = useState('');
    let [market, setMarket] = useState('');
    let [demand, setDemand] = useState('');
    let [growth, setGrowth] = useState('');
    let [rate, setRate] = useState('');
    let [resources, setResources] =  useState([]);
    let [tasks, setTasks] =  useState([]);

    const clearPlanIdeasHandler = async () => {
      dispatch(clearPlanIdeas());
    };

    const [createPlan] =
    useCreatePlanMutation();

    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        const res = await createPlan({
          name,
          description,
          ideas: planIdeas,
          resources,
          tasks,
          market,
          demand,
          growth,
          rate
        });
        console.log(res);
        toast.success(description + ' Plan created');
        props.refetch();
        await cancelPlan();
        navigate(`/plan/${res?.data?._id}`)
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };

    const addResource = () => {
        setResources([...resources, {name: '', cost: ''}]);
    }

    const updateResource = (i, r) => {
        const index = resources.findIndex((r, ri) => ri === i);
        Object.assign(resources[index], r);
        setResources([...resources]);
    }
    const addTask = () => {
        setTasks([...tasks, {name: '', time: ''}]);
    }
    const updateTask = (i, t) => {
        const index = tasks.findIndex((t, ti) => ti === i);
        Object.assign(tasks[index], t);
        setTasks([...tasks]);
    }

    const cancelPlan = async () => {
      await clearPlanIdeasHandler();
    }
    return (
            
        <Form onSubmit={submitHandler} className='my-2'> 
            <Row>
              <Col>
                <h2>Create Plan</h2>
                <div className='my-2'>
                  <label>Ideas:</label>
                  { 
                      planIdeas?.map(s => (
                        <Badge key={s._id} bg="primary" className="rounded-pill m-1">{s.keyword}</Badge> 
                      ))
                  }
                </div>

                <div className="form-floating">
                  <Form.Control
                    type='text'
                    as="textarea"
                    id="name"
                    name='name'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder='Describe the plan.'
                    className='mr-sm-2 ml-sm-5 my-2'
                  ></Form.Control>
                  <label htmlFor="name">Plan Name</label>
                </div>

                <div className="form-floating">
                  <Form.Control
                    type='text'
                    as="textarea"
                    id="desciption"
                    name='description'
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder='Describe the plan.'
                    className='mr-sm-2 ml-sm-5 my-2'
                  ></Form.Control>
                  <label htmlFor="description">Description</label>
                </div>


                <div className='my-2'>
                {
                    resources.map((r, i) => (
                    <div key={i} className="d-flex my-2">
                      <div className="form-floating">
                        <Form.Control
                        type='text'
                        id={'resource' + i}
                        name='resource'
                        value={r.name}
                        onChange={(e) => updateResource(i, {name: e.target.value})}
                        placeholder='Resource required'
                        className='mr-sm-2 ml-sm-5'
                        ></Form.Control>
                        <label htmlFor={'resource' + i}>Resource</label>
                      </div>

                      <div className="form-floating">
                        <Form.Control
                        type='number'
                        id={'cost' + i}
                        name='cost'
                        value={r.cost}
                        onChange={(e) => updateResource(i, {cost: e.target.value})}
                        placeholder='Cost of the resource'
                        className='mr-sm-2 ml-sm-5'
                        ></Form.Control>
                        <label htmlFor={'cost' + i}>Cost</label>
                      </div>
                       
                    </div>
                    ))
                }
                 <Button onClick={addResource} className="rounded-pill p-1">Add Resource +</Button>
                </div>
                <div className='my-2'>
                {
                    tasks.map((t, i) => (
                    <div key={i} className="d-flex my-2">
                      <div className="form-floating">
                        <Form.Control
                        type='text'
                        id={'task' + i}
                        name='task'
                        value={t.name}
                        onChange={(e) => updateTask(i, {name: e.target.value})}
                        placeholder='Task required'
                        className='mr-sm-2 ml-sm-5'
                        ></Form.Control>
                        <label htmlFor={'task' + i}>Task</label>
                      </div>

                      <div className="form-floating">
                        <Form.Control
                        id={'time' + i}
                        type='number'
                        name='time'
                        value={t.time}
                        onChange={(e) => updateTask(i, {time: e.target.value})}
                        placeholder='Time taken'
                        className='mr-sm-2 ml-sm-5'
                        ></Form.Control>
                        <label htmlFor={'time' + i}>Time</label>
                      </div>
                    </div>
                    ))
                }
                <Button onClick={addTask} className="rounded-pill p-1 ml-5">Add Task +</Button>
                </div>

                <Form.Control
                    type='text'
                    name='market'
                    value={market}
                    onChange={(e) => setMarket(e.target.value)}
                    placeholder='Market'
                    className='mr-sm-2 ml-sm-5 my-2'
                ></Form.Control>

                <Form.Control
                    type='number'
                    name='demand'
                    value={demand}
                    onChange={(e) => setDemand(e.target.value)}
                    placeholder='Demand'
                    className='mr-sm-2 ml-sm-5 my-2'
                ></Form.Control>

                <Form.Control
                    type='number'
                    name='growth'
                    value={growth}
                    onChange={(e) => setGrowth(e.target.value)}
                    placeholder='Growth'
                    className='mr-sm-2 ml-sm-5 my-2'
                ></Form.Control>

                <Form.Control
                    type='number'
                    name='rate'
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    placeholder='Rate'
                    className='mr-sm-2 ml-sm-5 my-2'
                ></Form.Control>

                <div className="d-flex justify-content-end">
                  <Button type='submit' variant='btn btn-primary' className='p-2 mx-2'>
                    Create Plan
                  </Button>
                  <Button variant='btn btn-warning' className='p-2' onClick={cancelPlan}>
                  Cancel
                  </Button>
                </div>
                <hr></hr>
              </Col>
            </Row>
        </Form>
    )
}


export default PlanForm;