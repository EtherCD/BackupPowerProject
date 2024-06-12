# Backup Power Project

Simple project, just for fun. Is website, where you can check current charge of your backup power battery

_There should have been a screenshot here, but I haven't started writing frontend yet_

## What is this?

My little auxiliary project

The essence of the project is a convenient display of the number of watts consumed from backup batteries. And other useful information to be aware of how much charge is left in the batteries, and thereby calculate how long it will take to charge. :)

Project consists of 3 parts:

1. A program for Arduino that reads data from the module and returns it after a request via SerialPort (for now, just discharge emulation is written)

2. The backend reads information from the Arduino via the serial port and provides routing for the frontend page.

3. Frontend on Preact (not ready)

## How is this supposed to work?

The measurements will be taken by the PZEM-004T module connected to Arduino.

Arduino connection to Raspberry Pi (you can use absolutely any analogue or laptop). Backend and frontend running on Raspberry Pi.

And voila, you can access the site from any device. And see the remaining charge, consumption, etc.
