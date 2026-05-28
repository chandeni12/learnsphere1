import React from 'react';

export default function Contact() {
    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h6 className="section-title bg-white text-center text-primary px-3">Contact Us</h6>
                    <h1 className="mb-5">Contact For Any Query</h1>
                </div>
                <div className="row g-4">
                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                        <h5>Get In Touch</h5>
                        <p className="mb-4">Feel free to reach out to us for any queries or support. We are here to help you.</p>
                        
                        {/* Address */}
                        <div className="d-flex align-items-center mb-3">
                            <div className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary" style={{width: '50px', height: '50px'}}>
                                <i className="fa fa-map-marker-alt text-white"></i>
                            </div>
                            <div className="ms-3">
                                <h5 className="text-primary">Office</h5>
                                <p className="mb-0 text-white">Madikeri, Karnataka, India</p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="d-flex align-items-center mb-3">
                            <div className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary" style={{width: '50px', height: '50px'}}>
                                <i className="fa fa-phone text-white"></i>
                            </div>
                            <div className="ms-3">
                                <h5 className="text-primary">Mobile</h5>
                                <p className="mb-0"><a href="tel:9030465611" className="text-white text-decoration-none">+91 90304 65611</a></p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="d-flex align-items-center mb-3">
                            <div className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary" style={{width: '50px', height: '50px'}}>
                                <i className="fa fa-envelope text-white"></i>
                            </div>
                            <div className="ms-3">
                                <h5 className="text-primary">Email</h5>
                                <p className="mb-0"><a href="mailto:chandeni134@gmail.com" className="text-white text-decoration-none">chandeni134@gmail.com</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                        {/* Placeholder for map or something else */}
                    </div>
                    <div className="col-lg-4 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
                        <form action="mailto:chandeni134@gmail.com" method="POST" encType="text/plain">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="name" placeholder="Your Name" />
                                        <label htmlFor="name">Your Name</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input type="email" className="form-control" id="email" placeholder="Your Email" />
                                        <label htmlFor="email">Your Email</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="subject" placeholder="Subject" />
                                        <label htmlFor="subject">Subject</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-floating">
                                        <textarea className="form-control" placeholder="Leave a message here" id="message" style={{height: '150px'}}></textarea>
                                        <label htmlFor="message">Message</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-primary w-100 py-3" type="submit">Send Message</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
