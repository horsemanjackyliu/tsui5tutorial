export default {
	name: "Unit test suite for the UI5 Application: com.sap.ui5tutorial",
	defaults: {
		page: "ui5://test-resources/com/sap/ui5tutorial/Test.qunit.html?testsuite={suite}&test={name}",
		qunit: {
			version: 2
		},
		ui5: {
			theme: "sap_horizon"
		},
		loader: {
			paths: {
				"com/sap/ui5tutorial": "../"
			}
		}
	},
	tests: {
		"unit/unitTests": {
			title: "Unit tests for the UI5 Application: com.sap.ui5tutorial"
		},
		"integration/opaTests": {
			title: "Integration tests for the UI5 Application: com.sap.ui5tutorial"
		}
	}
};
