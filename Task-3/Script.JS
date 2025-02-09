document.addEventListener('DOMContentLoaded', function() {
    showProblem('atm-problem'); // Show ATM problem by default on page load
});

function showProblem(problemId) {
    const problemCards = document.querySelectorAll('.problem-card');
    problemCards.forEach(card => {
        card.style.display = 'none'; // Hide all problem cards
    });

    const selectedProblem = document.getElementById(problemId);
    if (selectedProblem) {
        selectedProblem.style.display = 'block'; // Show the selected problem card
    }
}

// 1. ATM Withdrawal System
function solveATM() {
    const balance = parseFloat(document.getElementById('atm-balance').value);
    const amount = parseFloat(document.getElementById('atm-amount').value);
    const pin = document.getElementById('atm-set-pin').value;
    const enteredPin = document.getElementById('atm-entered-pin').value;

    if (enteredPin !== pin) {
        document.getElementById('atm-result').textContent = "Incorrect PIN";
    } else if (amount > balance) {
        document.getElementById('atm-result').textContent = "Insufficient Funds";
    } else if (amount % 100 !== 0) {
        document.getElementById('atm-result').textContent = "Enter amount in multiples of 100";
    } else {
        document.getElementById('atm-result').textContent = "Withdrawal Successful. Please take your cash.";
    }
}

// 2. Online Shopping Discount & Free Shipping
function solveShopping() {
    const orderAmount = parseFloat(document.getElementById('order-amount').value);
    let discount = 0;
    let shipping = 0;

    if (orderAmount > 1000) {
        discount = 0.20;
    } else if (orderAmount >= 500) {
        discount = 0.10;
    }

    let discountedAmount = orderAmount * (1 - discount);
    let discountValue = orderAmount * discount;

    if (discountedAmount < 50 && discountedAmount > 0) {
        shipping = 10;
    }

    document.getElementById('discount-amount').textContent = discountValue.toFixed(2);
    document.getElementById('shipping-amount').textContent = shipping.toFixed(2);
    document.getElementById('final-amount').textContent = (discountedAmount + shipping).toFixed(2);
}

// 3. Student Grading System
function solveGrading() {
    const marks = parseFloat(document.getElementById('marks').value);
    const attendance = parseFloat(document.getElementById('attendance').value);
    let finalMarks = marks;

    if (attendance > 90) {
        finalMarks += 5;
    }

    let grade;
    if (finalMarks >= 90) {
        grade = "A";
    } else if (finalMarks >= 80) {
        grade = "B";
    } else if (finalMarks >= 70) {
        grade = "C";
    } else if (finalMarks >= 60) {
        grade = "D";
    } else {
        grade = "F";
    }

    document.getElementById('grading-result').textContent = "Grade: " + grade;
}

// 4. Smart Traffic Light System
function solveTraffic() {
    const density = document.getElementById('traffic-density').value;
    let signalTime;

    if (density === "Heavy Traffic") {
        signalTime = "Green for 60 seconds";
    } else if (density === "Moderate Traffic") {
        signalTime = "Green for 40 seconds";
    } else if (density === "Light Traffic") {
        signalTime = "Green for 20 seconds";
    } else {
        signalTime = "Invalid traffic density";
    }

    document.getElementById('traffic-result').textContent = signalTime;
}

// 5. Movie Ticket Pricing
function solveMovie() {
    const age = parseInt(document.getElementById('age').value);
    const showTime = document.getElementById('show-time').value;
    let price = 12;

    const time = parseInt(showTime.split(':')[0]);

    if (time < 17) {
        price *= 0.80;
    }
    if (age > 60) {
        price *= 0.70;
    } else if (age < 12) {
        price *= 0.60;
    }

    document.getElementById('movie-result').textContent = "Ticket Price: $" + price.toFixed(2);
}

// 6. Job Application Filter
function solveJob() {
    const age = parseInt(document.getElementById('job-age').value);
    const experience = parseInt(document.getElementById('experience').value);
    const qualification = document.getElementById('qualification').value.toLowerCase();

    if (age >= 21 && age <= 55 && experience >= 2 && qualification === "bachelor's degree") {
        document.getElementById('job-result').textContent = "Eligible for job";
    } else {
        document.getElementById('job-result').textContent = "Not eligible for job";
    }
}

// 7. E-commerce Coupon Redemption
function solveCoupon() {
    const orderAmount = parseFloat(document.getElementById('coupon-order-amount').value);
    const couponCode = document.getElementById('coupon-code').value;
    let finalPrice = orderAmount;

    if (couponCode === "DISCOUNT10" && orderAmount > 500) {
        finalPrice = orderAmount * 0.90;
    } else if (couponCode === "FREESHIP" && orderAmount > 200) {
        document.getElementById('coupon-result').textContent = "Free Shipping applied. Final price: $" + orderAmount.toFixed(2);
        return;
    } else if (couponCode) {
        document.getElementById('coupon-result').textContent = "Invalid or inapplicable coupon";
        return;
    }

    document.getElementById('coupon-result').textContent = "Final Price: $" + finalPrice.toFixed(2);
}

// 8. Fitness Membership Plan
function solveFitness() {
    const planType = document.getElementById('plan-type').value;
    const wantsTrainer = document.getElementById('wants-trainer').checked;
    const wantsDietPlan = document.getElementById('wants-diet-plan').checked;

    if (planType === "VIP") {
        document.getElementById('fitness-result').textContent = "VIP plan is suggested: Gym + Trainer + Diet Plan ($80/month)";
    } else if (planType === "Premium" || wantsTrainer) {
        document.getElementById('fitness-result').textContent = "Premium plan is suggested: Gym + Personal Trainer ($50/month)";
    } else {
        document.getElementById('fitness-result').textContent = "Basic plan is suggested: Gym Access Only ($20/month)";
    }
}

// 9. Electricity Bill Calculation
function solveElectricity() {
    const units = parseFloat(document.getElementById('units').value);
    const timeOfDay = document.getElementById('time-of-day').value;
    let rate;

    if (units <= 100) {
        rate = 5;
    } else if (units <= 300) {
        rate = 4;
    } else {
        rate = 3;
    }

    let totalBill = units * rate;

    if (timeOfDay === "Peak hours") {
        totalBill *= 1.10;
    }

    document.getElementById('electricity-result').textContent = "Total Bill: $" + totalBill.toFixed(2);
}

// 10. Flight Ticket Booking System
function solveFlight() {
    const classType = document.getElementById('class-type').value;
    const luggageWeight = parseFloat(document.getElementById('luggage-weight').value);
    const isStudent = document.getElementById('is-student').checked;
    const isSenior = document.getElementById('is-senior').checked;
    let baseFare = 300;
    let additionalCharge = 0;
    let discount = 0;

    if (classType === "Business") {
        additionalCharge += 200;
    } else if (classType === "First") {
        additionalCharge += 500;
    }

    if (luggageWeight > 20) {
        additionalCharge += Math.ceil((luggageWeight - 20) / 10) * 50;
    }

    let totalFare = baseFare + additionalCharge;

    if (isStudent) {
        discount += 0.15;
    } else if (isSenior) {
        discount += 0.10;
    }

    totalFare *= (1 - discount);

    document.getElementById('flight-result').textContent = "Final Fare: $" + totalFare.toFixed(2);
}