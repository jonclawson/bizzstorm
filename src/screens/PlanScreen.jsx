import { useParams } from "react-router-dom";
import { useGetPlanDetailsQuery } from "../slices/planApiSlice";
import { Badge, Button, ListGroup } from "react-bootstrap";
import { LineChart } from "../components/LineChart";
import { jsPDF } from 'jspdf';

const PlanScreen = () => {
    const { id: planId } = useParams();

    const {data: plan} = useGetPlanDetailsQuery(planId);

    const createBizPlan = (plan) => {
        const dataset = [];
        const duration = 5 * 12;
        let months = duration;
        let month = 0;
        const releaseMonth = plan.tasks.reduce((a, b) => a + b.time, 0);
        let expense = 0;
        let profit = 0;
        let balance = 0
        let quantity = 0;
        do {
            expense += plan.resources.reduce((a, b) => a + b.cost, 0)
            if (month > releaseMonth) {
              const growth = (plan.growth/100) || 1;
              const demand = (growth * plan.demand) + plan.demand;
              quantity = demand * (month - releaseMonth);
              const rate = plan.rate || 0;
              profit += rate * quantity;
            }
            balance = (profit - expense);
            const date = new Date();
            date.setMonth(date.getMonth() + month);
      
            dataset.push({date, value: balance})
            months--;
            month++;
        } while (months > 0);
        return {
          expense,
          profit,
          balance,
          quantity,
          dataset
        };
      }
      let bizzPlan = {};
      if (plan) {
        console.log('plan', plan)
          bizzPlan = createBizPlan(plan);
          console.log(bizzPlan);
      }

    const openPDF = () => {
        const DATA = document.querySelector('.export-container');
        console.log(DATA.offsetWidth);
        const doc = new jsPDF('p', 'px', 'letter');
        doc.html(DATA, {
        html2canvas: {
            // insert html2canvas options here, e.g.
            scale: (816/DATA.offsetWidth) * .56
        },
          callback: (doc) => {
            doc.output('dataurlnewwindow');
          },
        });
      }
    
    return (
        <div>
            <Button variant="outline-primary" className="float-end btn btn-sm mx-3" onClick={openPDF}>Download</Button>
        <div className="container export-container">

           <h2 className="my-2">{plan?.name}</h2> 
           <div className="my-2">{plan?.description}</div> 

           <div className="my-2">
            <label>Keywords</label>
            <div>
            { 
                    plan?.ideas?.map(s => (
                    <Badge key={s?._id} bg="primary" className="rounded-pill m-1">{s?.keyword}</Badge> 
                    ))
                }
            </div>
           </div>

            <div className="my-2">
                <label>Resources</label>
                <ListGroup>
                {
                    plan?.resources.map(r => (
                        <ListGroup.Item key={r._id}>
                            {r.name} ${r.cost} Per Month
                        </ListGroup.Item>
                    ))
                }
                </ListGroup>
            </div>

            <div className="my-2">
                <label>Tasks</label>
                <ListGroup>
                {
                    plan?.tasks.map(t => (
                        <ListGroup.Item key={t._id}>
                            {t.name} {t.time} Months
                        </ListGroup.Item>
                    ))
                }
                </ListGroup>
            </div>

            
            <div className="my-2">
                <label>Market</label>
                <ListGroup>
                    <ListGroup.Item>
                       Market: {plan?.market} | Initial Demand:  {plan?.demand} <br/>
                       Expected Growth Rate: {plan?.growth}% | Monthly  Rate: ${plan?.rate}
                    </ListGroup.Item>
                </ListGroup>
            </div>

            <div id="chart-container" width="100%">
                {
                    bizzPlan?.dataset ? 
                    (
                        <LineChart data={bizzPlan?.dataset}>

                        </LineChart>
                    ) : ''
                }
            </div>
 
        </div>
        </div>
    )
}
export default PlanScreen;
