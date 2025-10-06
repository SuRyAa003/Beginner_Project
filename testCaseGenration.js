const testCase = [
    {
        "Item Number": [{ "value": "1", }],
        "Verification Number": [{ "value": "1-1" }],
        "Test Case": [{ "value": "画面レイアウト" }],
        "Test Pattern": [{ "value": "SC- [請求日], SC- [請求書号], SC- [発送日]", }],
        "Check Items": [{ "value": "", }],
        "Expected Result (Message)": [{ "value": "", }],
    },
    {
        "Item Number": [{ "value": "1", }],
        "Verification Number": [{ "value": "1-1" }],
        "Test Case": [{ "value": "" }],
        "Test Pattern": [{ "value": "", }],
        "Check Items": [{ "value": "", }],
        "Expected Result (Message)": [{ "value": "", }]
    }
];

function testCaseGenration () {
    const result = [];
    testCase.forEach(test => {
        const checkItems = test["Check Items"][0]?.value || "";
        if (checkItems.includes("メッセージ一覧")) {
            const match = checkItems.match(/\d+/);
            if (match) {
                const messageCode = match[0];
                messageList.forEach(message => {
                    if (message["Message Code"][0]?.value === messageCode) {
                        result.push({
                            "Item Number": test["Item Number"],
                            "Verification Number": test["Verification Number"],
                            "Test Case": test["Test Case"],
                            "Test Pattern": test["Test Pattern"],
                            "Check Items": [{ "value": "メッセージ出力" }],
                            "Expected Result (Message)": message["Message"],
                        });
                        result.push({ "Item Number": [{ "value": "" }], "Verification Number": [{ "value": "" }], "Test Case": [{ "value": "" }], "Test Pattern": [{ "value": "" }], "Check Items": [{ "value": "" }], "Expected Result (Message)": message["Variable 1"] });
                        result.push({ "Item Number": [{ "value": "" }], "Verification Number": [{ "value": "" }], "Test Case": [{ "value": "" }], "Test Pattern": [{ "value": "" }], "Check Items": [{ "value": "" }], "Expected Result (Message)": message["Variable 2"] });
                        result.push({ "Item Number": [{ "value": "" }], "Verification Number": [{ "value": "" }], "Test Case": [{ "value": "" }], "Test Pattern": [{ "value": "" }], "Check Items": [{ "value": "" }], "Expected Result (Message)": message["Variable 3"] });
                        result.push({ "Item Number": [{ "value": "" }], "Verification Number": [{ "value": "" }], "Test Case": [{ "value": "" }], "Test Pattern": [{ "value": "" }], "Check Items": [{ "value": "" }], "Expected Result (Message)": message["Variable 4"] });
                        result.push({ "Item Number": [{ "value": "" }], "Verification Number": [{ "value": "" }], "Test Case": [{ "value": "" }], "Test Pattern": [{ "value": "" }], "Check Items": [{ "value": "タイプ" }], "Expected Result (Message)": message["Type"] });
                    }
                });
            }
        }

        if (test["Test Case"][0]?.value === "画面レイアウト") {
            result.push({
                "Item Number": test["Item Number"],
                "Verification Number": test["Verification Number"],
                "Test Case": [{ "value": "画面レイアウト" }],
                "Test Pattern": [{ "value": "画面に表示される場合" }],
                "Check Items": [{ "value": "画面レイアウト" }],
                "Expected Result (Message)": [{ "value": "画面レイアウトは仕様通りです" }]
            });
        }

        if (test["Test Pattern"][0]?.value === "画面項目") {
            const requiredItems = screenItem.filter(item => item["required"][0]?.value === "●").map(item => item["item_name"]);
            requiredItems.forEach(itemName => {
                result.push({
                    "Item Number": test["Item Number"],
                    "Verification Number": test["Verification Number"],
                    "Test Case": [{ "value": "必須入力項目を確認してください" }],
                    "Test Pattern": [{ "value": "" }],
                    "Check Items": itemName,
                    "Expected Result (Message)": [{ "value": "これは必須の入力フィールドです" }]
                });
            });

            const f4Items = screenItem.filter(item => item["F4 help_input source"][0]?.value === "要素").map(item => item["item_name"]);
            f4Items.forEach(itemName => {
                result.push({
                    "Item Number": test["Item Number"],
                    "Verification Number": test["Verification Number"],
                    "Test Case": itemName,
                    "Test Pattern": [{ "value": F4ボタンを押すと`${itemName}` }],
                    "Check Items": itemName,
                    "Expected Result (Message)": [{ "value": 検索ヘルプが設定されています`${itemName} 選択画面で` }]
                });
            });

            const defaultItems = screenItem.filter(item => item["Default Value"][0]?.value !== "");
            defaultItems.forEach(item => {
                result.push({
                    "Item Number": test["Item Number"],
                    "Verification Number": test["Verification Number"],
                    "Test Case": [{ "value": "初期値の確認" }],
                    "Test Pattern": [{ "value": "" }],
                    "Check Items": item["item_name"],
                    "Expected Result (Message)": [{ "value": セット内容`${item["Default Value"][0]?.value}` }]
                });
            });
        } else {
            const hasRelevantData = test["Check Items"][0]?.value || test["Test Case"][0]?.value || test["Test Pattern"][0]?.value;
            if (hasRelevantData) {
                result.push({
                    "Item Number": test["Item Number"],
                    "Verification Number": test["Verification Number"],
                    "Test Case": test["Test Case"],
                    "Test Pattern": test["Test Pattern"],
                    "Check Items": test["Check Items"],
                    "Expected Result (Message)": test["Expected Result (Message)"]
                });
            }
        }
    });
    // var1 = JSON.stringify(result, null, 2)
    return JSON.stringify(result, null, 2);
}
testCaseGenration();

console.log(testCaseGenration());