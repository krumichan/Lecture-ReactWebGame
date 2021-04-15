import React, {Component} from 'react';
import SampleListTry from "./SampleListTry";
import SampleMapTry from "./SampleMapTry";

class ListMap extends Component {
    state = {

    }

    fruitList = [
        '사과'
        , '감'
        , '귤'
        , '밤'
        , '배'
        , '무'
        , '수박'
    ]

    fruitMap = [
        { fruit: '사과', taste: '맛(1)' }
        , { fruit: '감', taste: '맛(3)' }
        , { fruit: '귤', taste: '맛(4)' }
        , { fruit: '밤', taste: '맛(5)' }
        , { fruit: '배', taste: '맛(6)' }
        , { fruit: '무', taste: '맛(7)' }
        , { fruit: '수박', taste: '맛(8)' }
    ];

    render() {
        return (
            <>
                <h1>List Map Test</h1>
                <ul>
                    {this.fruitMap.map((v, i) => {
                        return (
                            <>
                                <h1> Sample List Try </h1>
                                <SampleListTry />
                                <hr/>

                                <h1> Sample Map Try </h1>
                                <SampleMapTry />
                            </>
                        );
                    })}
                </ul>
            </>
        );
    }
}