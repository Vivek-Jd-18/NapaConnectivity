import React from 'react';
import Container from '../../Layout/Container/Container';
import Footer from '../Footer/Footer';
import styles from './Events.module.scss';
import Image from 'next/image';
import Cardlist from './Cardlist';
import Select from 'react-select'
import 'bootstrap-daterangepicker/daterangepicker.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import moment from 'moment';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'rc-slider/assets/index.css';


export default function EventsList(props: any) {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const [active, setActive] = React.useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  return (
    <>
    <div className={`${styles.container}`}>
      <Container className={`${styles.settingsContainer} asinnerContainer`}>
        <h1 className={styles.settings}>Events</h1>
        <div className={styles.tipandtotolmain}>
          <div className='select_main'>
            <Select 
                options={options} 
                // menuIsOpen={true}
                className="select_pernt"
                placeholder="Category"
                classNamePrefix='cntrslct'
            />
            <div className="datepickerBox">
                <DateRangePicker
                    initialSettings={{
                    singleDatePicker: true,
                    showDropdowns: true,
                    maxYear: parseInt(moment().format('YYYY'), 10),
                    opens: 'left',
                    }}
                >
                    <input
                    type="text"
                    className="form-control"
                    placeholder="End Date"
                    />
                </DateRangePicker>
            </div>
            </div>
            <div className={styles.AnyObjects}>
              <button className={styles.FilterButton} onClick={handleClick}>
                Filters
              </button>
            </div>
          <div
            className={
              active
                ? `${styles.FilterBox} ${styles.active}`
                : `${styles.FilterBox}`
            }
          >
          <button className={styles.ExitButton} onClick={handleClick}>
            <Image src="/img/exit_icon.svg" alt="" width="24px" height="24px" />
          </button>
          <div className={`${styles.MobileDatpcker} MobileDatpckerEvent`} >
            <div className='select_main select_main_event'>
              <Select 
                  options={options} 
                  // menuIsOpen={true}
                  className="select_pernt"
                  placeholder="Category"
                  classNamePrefix='cntrslct'
              />
              <div className="datepickerBox">
                  <DateRangePicker
                      initialSettings={{
                      singleDatePicker: true,
                      showDropdowns: true,
                      maxYear: parseInt(moment().format('YYYY'), 10),
                      opens: 'left',
                      }}
                  >
                      <input
                      type="text"
                      className="form-control"
                      placeholder="End Date"
                      />
                  </DateRangePicker>
              </div>
            </div>
          </div>

      </div>
          <div className={styles.buttonpernt}>
              <button><Image src='/img/search_icon_aj.svg' alt='' height="24px" width="24px" className='' /></button>
          </div>
        </div>
        <div className={styles.EventsListcrol}>
            <div className={styles.EventsListOvrl}>
                <div className={styles.EventsListGridBx}>
                    <div><Cardlist /></div>                                       
                    <div><Cardlist /></div>                                       
                    <div><Cardlist /></div>                                       
                    <div><Cardlist /></div> 
                    <div><Cardlist /></div>                                       
                    <div><Cardlist /></div>                                       
                    <div><Cardlist /></div>                                       
                    <div><Cardlist /></div>                                      
                </div>
            </div>
        </div>
        
      </Container>
      <div>
        <hr />
        <Footer footerIconShow={false} />
      </div>
    </div>
    </>
  )
}
