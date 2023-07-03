import axios from 'axios'
import { useCallback, useState } from 'react'
import { Background } from '../Style/MainStyledComponents'

function AwsRequest() {
    const [uploadState, setUploadState] = useState<string>('')
    const formData = new FormData()
    const onUploadImage = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files) {
                return
            }
            formData.delete('image')
            formData.append('image', e.target.files[0])
        },
        []
    )

    async function Upload(formData: FormData) {
        if (!formData.has('image')) {
            setUploadState('없어')
        } else {
            setUploadState('')
            const url =
                'https://wnxfrgkleb.us18.qoddiapp.com/https://vp20edcx99.execute-api.ap-northeast-2.amazonaws.com/image'
            await axios
                .post(url, formData)
                .then((response) => {
                    console.log(response.data)
                    setUploadState('v')
                })
                .catch((error) => {
                    console.error(error)
                    setUploadState('x')
                })
        }
    }

    return (
        <Background>
            <form encType='multipart/form-data'>
                <input
                    type='file'
                    accept='image/*'
                    onChange={onUploadImage}
                />
            </form>

            <button onClick={() => Upload(formData)}>업로드</button>

            <h2>{uploadState}</h2>
        </Background>
    )
}

export default AwsRequest
