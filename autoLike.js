var socialBar = document.getElementsByClassName('react-button__trigger artdeco-button artdeco-button--muted artdeco-button--4 artdeco-button--tertiary ember-view');

console.log("Social bar is " + socialBar);

function getJobPostingObj(obj, n) {
      setTimeout(() => {
        console.log('Processing object ' + n);
        var btnViewId = obj.getAttribute('id');
        console.log('Scrolling to view with ID ' + btnViewId);
        document.getElementById(btnViewId).scrollIntoView();

        console.log("Getting button text " );
        var likeBtn = obj;
        console.log("Like btn = " + likeBtn );

	var btnStatus = likeBtn.innerText;
        console.log("Button text is " + btnStatus);
		if(btnStatus == 'J’aime'){
                        console.log("Found the like button. Checking if it is pressed.");

                        var ariapressed = likeBtn.getAttribute('aria-pressed');
                        console.log("Aria pressed : " + ariapressed);
                        if(ariapressed != 'true'){
                            console.log("Yessss!!!!!!! Ready to click. We can click!");
			    likeBtn.click();
                        }
                        else{
                            console.log("Already pressed :(");
                        }
		}
      }, ((n + 1) * 1800));
    }


for(var i=0; i<socialBar.length; i++){
	getJobPostingObj(socialBar[i], i);
}
