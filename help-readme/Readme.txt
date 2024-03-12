npx playwright test --grep --% "@geolocation" --project=chromium --headed 


//to run only two type of tagged tests
npx playwright test --grep --% "@fast^|@tab2"

//it should open browser using --headed option
npx playwright test --grep --% "@fast^|@tab2" --headed

//it should only run on chrome browser 
npx playwright test --grep --% "@fast^|@tab2" --headed --project=chromium

//run multiple tests based on one common tag 
npx playwright test --grep --% "@calculations" --headed --project=chromium


npx playwright test --grep --% "@fast^|@tab2" --headed --project=smoke

npx playwright test --grep --% "@fast^|@tab2" --headed --project=prod

//run for two projects 
npx playwright test test --grep --% "@fast^|@tab2" --headed --project=MobileSafari --project=MobileChromeViewPort

//run on multi devices settings 
npx playwright test test --grep --% "@fast^|@tab2" --headed --project=mutipleDevices 

@geolocation
npx playwright test test --grep --% "@geolocation" --headed --project=mutipleDevices 


//sample command to run with other options
npx playwright test --project=chromium --headed --reporter dot --timeout 30000 --workers 4 --forbid-only --retries 3 --max-failures 5

//download tag 
npx playwright test --grep "@download" --project=chromium


//for Debugging in powershell
    //Set the environment variable 
    $env:PWDEBUG=1

    //Execute any command
    npx playwright test --grep --% "@addition" --headed --project=chromium


    //with Debug mode
    npx playwright test --debug

    It will halt the execution on browser debugger
 
 //With trace mode on 
 npx playwright test --grep --% "@slower" --headed --project=chromium --workers=1 --trace on

//run as per text name presence
    npx playwright test -g "calculat"

    npx playwright test -g "addition"
