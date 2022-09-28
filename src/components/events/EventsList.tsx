import React from 'react';
import Container from '../../Layout/Container/Container';
import Footer from '../Footer/Footer';
import styles from './Events.module.scss';
import Image from 'next/image';
import Select from 'react-select'
import 'bootstrap-daterangepicker/daterangepicker.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import moment from 'moment';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'rc-slider/assets/index.css';
import Link from 'next/link';


export default function EventsList() {
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
        
            <div className={styles.EventsListOvrl}>
              <div className={styles.EventsListcrol}>
                <div className={styles.EventsListGridBx}>
                    <div>
                      <div className={styles.CardlistPrntBx}>
                        <Link href="#" className={styles.CardlistPrntBxLink}>
                            <a className={`${styles.CardlistABx} hovereffect`}>
                                <Image src='/img/event_list_img_01.png' width={282} height={372} alt="" className='evmtimg'/>
                                <div className={styles.CardBxTopconten}>
                                  <Image src='/img/location_icon_evnt.svg' width={20} height={20} alt="" />
                                  <h2>250 Gerrard Street, Toronto</h2>
                                </div>
                                <div className={styles.CardBxBotconten}>
                                  <p>Annual Meetingof the NTF Community</p>
                                  <h3>Aug 29, 17:00</h3>
                                </div>
                            </a>            
                        </Link>              
                      </div>                      
                    </div>                                       
                    <div>
                      <div className={styles.CardlistPrntBx}>
                          <Link href="#" className={styles.CardlistPrntBxLink}>
                              <a className={`${styles.CardlistABx} hovereffect`}>
                                  <Image src='/img/event_list_img_02.png' width={282} height={372} alt="" className='evmtimg'/>
                                  <div className={styles.CardBxTopconten}>
                                    <Image src='/img/location_icon_evnt.svg' width={20} height={20} alt="" />
                                    <h2>Dupont St, Toronto</h2>
                                  </div>
                                  <div className={styles.CardBxBotconten}>
                                    <p>A Lecture on NFT from Around the World</p>
                                    <h3>Aug 22, 12:30</h3>
                                  </div>
                              </a>            
                          </Link>              
                        </div> 
                    </div>                                       
                    <div>
                      <div className={styles.CardlistPrntBx}>
                          <Link href="#" className={styles.CardlistPrntBxLink}>
                              <a className={`${styles.CardlistABx} hovereffect`}>
                                  <Image src='/img/event_list_img_03.png' width={282} height={372} alt="" className='evmtimg'/>
                                  <div className={styles.CardBxTopconten}>
                                    <Image src='/img/location_icon_evnt.svg' width={20} height={20} alt="" />
                                    <h2>205 Carlton St, Toronto</h2>
                                  </div>
                                  <div className={styles.CardBxBotconten}>
                                    <p>NFT as the Meaning of Life and its Benefits</p>
                                    <h3>Aug 18, 16:30</h3>
                                  </div>
                              </a>            
                          </Link>              
                        </div> 
                    </div>  
                    <div>
                      <div className={styles.CardlistPrntBx}>
                          <Link href="#" className={styles.CardlistPrntBxLink}>
                              <a className={`${styles.CardlistABx} hovereffect`}>
                                  <Image src='/img/event_list_img_04.png' width={282} height={372} alt="" className='evmtimg'/>
                                  <div className={styles.CardBxTopconten}>
                                    <Image src='/img/location_icon_evnt.svg' width={20} height={20} alt="" />
                                    <h2>5 Great Lakes Dr, Brampton</h2>
                                  </div>
                                  <div className={styles.CardBxBotconten}>
                                    <p>Join the NFT Community for Beginners</p>
                                    <h3>Aug 16, 19:00</h3>
                                  </div>
                              </a>            
                          </Link>              
                        </div> 
                    </div>   
                    <div>
                      <div className={styles.CardlistPrntBx}>
                          <Link href="#" className={styles.CardlistPrntBxLink}>
                              <a className={`${styles.CardlistABx} hovereffect`}>
                                  <Image src='/img/event_list_img_05.png' width={282} height={372} alt="" className='evmtimg'/>
                                  <div className={styles.CardBxTopconten}>
                                    <Image src='/img/location_icon_evnt.svg' width={20} height={20} alt="" />
                                    <h2>250 Gerrard10078 Brampton</h2>
                                  </div>
                                  <div className={styles.CardBxBotconten}>
                                    <p>Change wholly say why eldest period.</p>
                                    <h3>Aug 13, 21:30</h3>
                                  </div>
                              </a>            
                          </Link>              
                        </div> 
                    </div>   
                    <div>
                      <div className={styles.CardlistPrntBx}>
                          <Link href="#" className={styles.CardlistPrntBxLink}>
                              <a className={`${styles.CardlistABx} hovereffect`}>
                                  <Image src='/img/event_list_img_06.png' width={282} height={372} alt="" className='evmtimg'/>
                                  <div className={styles.CardBxTopconten}>
                                    <Image src='/img/location_icon_evnt.svg' width={20} height={20} alt="" />
                                    <h2>127 Briarwood Ave, Toronto</h2>
                                  </div>
                                  <div className={styles.CardBxBotconten}>
                                    <p>However venture pursuit he am mr cordial.</p>
                                    <h3>Aug 10, 22:00</h3>
                                  </div>
                              </a>            
                          </Link>              
                        </div> 
                    </div>  
                    <div>
                      <div className={styles.CardlistPrntBx}>
                          <Link href="#" className={styles.CardlistPrntBxLink}>
                              <a className={`${styles.CardlistABx} hovereffect`}>
                                  <Image src='/img/event_list_img_07.png' width={282} height={372} alt="" className='evmtimg'/>
                                  <div className={styles.CardBxTopconten}>
                                    <Image src='/img/location_icon_evnt.svg' width={20} height={20} alt="" />
                                    <h2>Sandy Hill, Ottawa</h2>
                                  </div>
                                  <div className={styles.CardBxBotconten}>
                                    <p>Ourselves for determine attending how led.</p>
                                    <h3>Aug 8, 11:30</h3>
                                  </div>
                              </a>            
                          </Link>              
                        </div> 
                    </div>                                  
                    <div>
                      <div className={styles.CardlistPrntBx}>
                          <Link href="#" className={styles.CardlistPrntBxLink}>
                              <a className={`${styles.CardlistABx} hovereffect`}>
                                  <Image src='/img/event_list_img_08.png' width={282} height={372} alt="" className='evmtimg'/>
                                  <div className={styles.CardBxTopconten}>
                                    <Image src='/img/location_icon_evnt.svg' width={20} height={20} alt="" />
                                    <h2>90 Templeton St, Ottawa</h2>
                                  </div>
                                  <div className={styles.CardBxBotconten}>
                                    <p>Now indulgence dissimilar for his thoroughly has.</p>
                                    <h3>Aug 3, 14:00</h3>
                                  </div>
                              </a>            
                          </Link>              
                        </div> 
                    </div>     
                    <div>
                      <div className={styles.CardlistPrntBx}>
                          <Link href="#" className={styles.CardlistPrntBxLink}>
                              <a className={`${styles.CardlistABx} hovereffect`}>
                                  <Image src='/img/event_list_img_05.png' width={282} height={372} alt="" className='evmtimg'/>
                                  <div className={styles.CardBxTopconten}>
                                    <Image src='/img/location_icon_evnt.svg' width={20} height={20} alt="" />
                                    <h2>250 Gerrard10078 Brampton</h2>
                                  </div>
                                  <div className={styles.CardBxBotconten}>
                                    <p>Change wholly say why eldest period.</p>
                                    <h3>Aug 13, 21:30</h3>
                                  </div>
                              </a>            
                          </Link>              
                        </div> 
                    </div>   
                    <div>
                      <div className={styles.CardlistPrntBx}>
                          <Link href="#" className={styles.CardlistPrntBxLink}>
                              <a className={`${styles.CardlistABx} hovereffect`}>
                                  <Image src='/img/event_list_img_06.png' width={282} height={372} alt="" className='evmtimg'/>
                                  <div className={styles.CardBxTopconten}>
                                    <Image src='/img/location_icon_evnt.svg' width={20} height={20} alt="" />
                                    <h2>127 Briarwood Ave, Toronto</h2>
                                  </div>
                                  <div className={styles.CardBxBotconten}>
                                    <p>However venture pursuit he am mr cordial.</p>
                                    <h3>Aug 10, 22:00</h3>
                                  </div>
                              </a>            
                          </Link>              
                        </div> 
                    </div>  
                    <div>
                      <div className={styles.CardlistPrntBx}>
                          <Link href="#" className={styles.CardlistPrntBxLink}>
                              <a className={`${styles.CardlistABx} hovereffect`}>
                                  <Image src='/img/event_list_img_07.png' width={282} height={372} alt="" className='evmtimg'/>
                                  <div className={styles.CardBxTopconten}>
                                    <Image src='/img/location_icon_evnt.svg' width={20} height={20} alt="" />
                                    <h2>Sandy Hill, Ottawa</h2>
                                  </div>
                                  <div className={styles.CardBxBotconten}>
                                    <p>Ourselves for determine attending how led.</p>
                                    <h3>Aug 8, 11:30</h3>
                                  </div>
                              </a>            
                          </Link>              
                        </div> 
                    </div>                                  
                    <div>
                      <div className={styles.CardlistPrntBx}>
                          <Link href="#" className={styles.CardlistPrntBxLink}>
                              <a className={`${styles.CardlistABx} hovereffect`}>
                                  <Image src='/img/event_list_img_08.png' width={282} height={372} alt="" className='evmtimg'/>
                                  <div className={styles.CardBxTopconten}>
                                    <Image src='/img/location_icon_evnt.svg' width={20} height={20} alt="" />
                                    <h2>90 Templeton St, Ottawa</h2>
                                  </div>
                                  <div className={styles.CardBxBotconten}>
                                    <p>Now indulgence dissimilar for his thoroughly has.</p>
                                    <h3>Aug 3, 14:00</h3>
                                  </div>
                              </a>            
                          </Link>              
                        </div> 
                    </div>                             
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
