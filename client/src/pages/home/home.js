import React from 'react'
import "./styles.css"

export default function Home() {
    return ( 
        <div id="main">

            <div class="row text-center" id="main-row">
            {/* <img src="https://images.unsplash.com/photo-1471584363844-b3909b58d6f7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3648&q=80"
                class="img-fluid" id="random-pic" alt="..."></ img> */}

                <div class="jumbotron">
                    <h1 class="display-4" id="main-header">Photo Drop! </h1>
                    <p class="lead" id="intro">This is where we can write about our website</p>
                    <p class="lead" id="intro-sub">
                    <a class="btn btn-primary btn-lg" href="#" role="button">Maybe this can be another login button
                        or
                        maybe
                    </a>
                    </p>
                </div>

            </div>

        </div>

    )}
