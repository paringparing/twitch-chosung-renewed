import Link from "next/link"
import { useMutation, useQuery } from "@blitzjs/rpc"
import Router, { useRouter } from "next/router"
import { BlitzPage } from "@blitzjs/next"
import React from "react"
import GameLayout from "../../../../app/game/layout"
import Form from "../../../../app/core/components/Form"
import LabeledTextField from "../../../../app/core/components/LabeledTextField"
import { RevolvingDot } from "react-loader-spinner"
import getFullCategory from "../../../../app/game/queries/customCategories/getFullCategory"
import { FaArrowLeft } from "react-icons/fa"
import DifficultySelector from "../../../../app/core/components/DifficultySelector"
import { Button } from "../../../../app/game/components/Button"
import { Colors } from "../../../../app/game/constants"
import { AnimatePresence, motion } from "framer-motion"
import { MdAdd, MdError, MdExpandMore, MdRemove } from "react-icons/md"
import { Listbox } from "@headlessui/react"
import { FormRenderProps, useField } from "react-final-form"
import getUser from "../../../../app/game/mutations/users/getUser"
import getUserQuery from "../../../../app/game/queries/users/getUserQuery"
import addSharedUser from "../../../../app/game/mutations/categories/addSharedUser"
import Overlay from "../../../../app/game/components/Overlay"
import removeSharedUser from "../../../../app/game/mutations/categories/removeSharedUser"
import { message } from "antd"
import deleteCategory from "../../../../app/game/mutations/categories/deleteCustomCategory"
import editCustomCategory from "../../../../app/game/validation/editCustomCategory"
import editCustomCategoryMutation from "../../../../app/game/mutations/categories/editCustomCategory"

const CategoryEditor: BlitzPage = () => {
  return (
    <React.Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <RevolvingDot width={160} height={160} color="#fff" />
        </div>
      }
    >
      <CategoryEditorContent />
    </React.Suspense>
  )
}

const VisibilitySelector: React.FC = () => {
  const {
    input: { value, onChange },
  } = useField<"PRIVATE" | "PUBLIC">("visibility")

  return (
    <div className="dropdownContainer">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          height: "100%",
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 800, paddingLeft: 24 }}>공개 상태</div>
        <Listbox value={"PUBLIC"} onChange={onChange}>
          <div style={{ position: "relative", flexGrow: 1 }}>
            <Listbox.Button
              style={{
                height: "100%",
                background: "rgba(255, 255, 255, 0.2)",
                display: "flex",
                borderRadius: 20,
                paddingLeft: 24,
                paddingRight: 24,
                alignItems: "center",
                fontSize: 24,
                fontWeight: 800,
                cursor: "pointer",
                border: "none",
                outline: "none",
              }}
              as="div"
            >
              <div style={{ flexGrow: 1, lineHeight: 0 }}>
                {(() => {
                  switch (value) {
                    case "PUBLIC":
                      return "공개"
                    case "PRIVATE":
                      return "비공개"
                  }
                  return value
                })()}
              </div>
              <MdExpandMore size={32} />
            </Listbox.Button>
            <AnimatePresence>
              <Listbox.Options
                as="div"
                style={{
                  position: "absolute",
                  width: "100%",
                  background: "rgba(255, 255, 255, 0.4)",
                  borderRadius: 20,
                  overflow: "hidden",
                  outline: "none",
                }}
              >
                <Listbox.Option value="PUBLIC">공개</Listbox.Option>
                <Listbox.Option value="PRIVATE">비공개</Listbox.Option>
              </Listbox.Options>
            </AnimatePresence>
          </div>
        </Listbox>
      </div>
    </div>
  )
}

const UserAddDialog: React.FC<FormRenderProps & { errorMessage: string | null }> = ({
  errorMessage,
}) => {
  const [data, setData] = React.useState<any>(null)
  const [loading, setLoading] = React.useState<boolean>(false)
  const {
    input: { value },
    meta: { dirty, submitting },
  } = useField("id")
  const [fetchUser] = useMutation(getUser)
  React.useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        if (!value) {
          setData(null)
          return
        }
        const data = await fetchUser(value)
        setData(data)
      } finally {
        setLoading(false)
      }
    })()
    return () => {
      setData(null)
    }
  }, [fetchUser, value])

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 30, width: 500 }}>
      <div
        style={{
          fontSize: 32,
          textAlign: "center",
          width: "100%",
          fontWeight: 800,
        }}
      >
        주제 공유하기
      </div>
      {errorMessage && (
        <div
          style={{
            background: Colors.red,
            fontSize: 24,
            padding: "20px 24px",
            borderRadius: 20,
            color: "#fff",
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <MdError size={28} />
          {errorMessage}
        </div>
      )}
      <LabeledTextField loading={loading} autoComplete="off" name="id" label="유저 ID" />
      {dirty ? (
        data ? (
          <div
            style={{
              padding: 20,
              display: "flex",
              borderRadius: 20,
              background: "rgba(255, 255, 255, 0.2)",
              alignItems: "center",
              gap: 16,
            }}
          >
            {data.avatar ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={data.avatar} alt="" style={{ width: 60, height: 60, borderRadius: 30 }} />
            ) : (
              <div style={{ width: 60, height: 60, borderRadius: 30, background: "#fff" }} />
            )}
            <div style={{ fontSize: 24 }}>{data.name}</div>
          </div>
        ) : (
          <div
            style={{
              padding: 20,
              borderRadius: 20,
              background: "rgba(255, 255, 255, 0.2)",
              fontSize: 24,
              textAlign: "center",
            }}
          >
            존재하지 않는 유저입니다
          </div>
        )
      ) : null}
      <Button fullWidth disabled={loading || !data || submitting} type="submit">
        추가하기
      </Button>
    </div>
  )
}

const SharedUserItem: React.FC<{ userId: string; onDelete: () => void }> = ({
  userId,
  onDelete,
}) => {
  const [user] = useQuery(getUserQuery, userId)

  return (
    <div style={{ height: 80, display: "flex", alignItems: "center", padding: 10, gap: 20 }}>
      {user ? (
        <>
          {user.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.avatar} style={{ width: 60, height: 60, borderRadius: 60 }} alt="" />
          ) : (
            <div style={{ width: 60, height: 60, background: "#fff", borderRadius: 30 }} />
          )}
          <div style={{ fontSize: 24, fontWeight: 800 }}>{user.name}</div>
          <div style={{ flexGrow: 1 }} />
          <Overlay style={{ width: 500 }} button={<Button color={Colors.red}>제거</Button>}>
            {({ close }) => (
              <>
                <div style={{ fontSize: 32, fontWeight: 800, textAlign: "center" }}>
                  주제 공유 취소
                </div>
                <div style={{ fontSize: 24, textAlign: "center" }}>
                  {user.name} 님의 주제 접근 권한을 제거합니다. 계속할까요?
                </div>
                <Button
                  color={Colors.red}
                  onClick={() => {
                    close()
                    onDelete()
                  }}
                >
                  제거
                </Button>
                <Button onClick={() => close()}>취소</Button>
              </>
            )}
          </Overlay>
        </>
      ) : (
        <>
          <div style={{ width: 60, height: 60, background: "#fff", borderRadius: 30 }} />
          <div style={{ fontSize: 24, fontWeight: 800 }}>알 수 없음</div>
        </>
      )}
    </div>
  )
}

const WordItem: React.FC<{ index: number }> = ({ index }) => {
  const {
    input: wordInput,
    meta: { touched: wordTouched, error: wordError, submitError: wordSubmitError },
  } = useField(`words.${index}.word`)
  const {
    input: hintInput,
    meta: { touched: hintTouched, error: hintError, submitError: hintSubmitError },
  } = useField(`words.${index}.hint`)

  const normalizedWordError = Array.isArray(wordError)
    ? wordError.join(", ")
    : wordError || wordSubmitError
  const normalizedHintError = Array.isArray(hintError)
    ? wordError.join(", ")
    : hintError || hintSubmitError

  const {
    input: { value, onChange },
  } = useField("words")

  return (
    <div style={{ display: "flex", gap: 20 }}>
      <div style={{ flexGrow: 1 }}>
        <input type="text" placeholder="단어" {...wordInput} />
        {wordTouched && normalizedWordError && (
          <div role="alert" style={{ color: "red", fontSize: 24, paddingLeft: 24, paddingTop: 6 }}>
            {normalizedWordError}
          </div>
        )}
      </div>
      <div style={{ flexGrow: 1 }}>
        <input type="text" placeholder="힌트" {...hintInput} />
        {hintTouched && normalizedHintError && (
          <div role="alert" style={{ color: "red", fontSize: 24, paddingLeft: 24, paddingTop: 6 }}>
            {normalizedHintError}
          </div>
        )}
      </div>
      <div
        style={{
          width: 60,
          height: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: 20,
          cursor: "pointer",
        }}
        onClick={() => {
          onChange(value.filter((_, i) => i !== index))
        }}
      >
        <MdRemove size={48} />
      </div>
      <style jsx>{`
        input {
          width: 100%;
          height: 60px;
          border: none;
          outline: none;
          border-radius: 20px;
          font-size: 24px;
          font-weight: 800;
          padding: 0 24px;
          background: rgba(255, 255, 255, 0.2);
        }
        input::placeholder {
          color: rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </div>
  )
}

const CategoryEditorContent: BlitzPage = () => {
  const router = useRouter()

  const id = React.useMemo(() => {
    const i = Number(router.query.id)
    if (isNaN(i)) return -1
    return i
  }, [router.query.id])

  const [item, { refetch }] = useQuery(getFullCategory, id, {
    refetchInterval: false,
    refetchOnMount: false,
    refetchIntervalInBackground: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
  const [addSharedUserMutation] = useMutation(addSharedUser)
  const [removeSharedUserMutation] = useMutation(removeSharedUser)
  const [deleteMutation] = useMutation(deleteCategory)
  const [editCategory] = useMutation(editCustomCategoryMutation)
  const [addError, setAddError] = React.useState<string | null>(null)

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <div>
        <Link href={"/game/selectCategory"} passHref>
          <a
            style={{
              fontSize: 24,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              color: "#000",
            }}
          >
            <FaArrowLeft />
            <div>돌아가기</div>
          </a>
        </Link>
      </div>
      {item ? (
        <Form
          schema={editCustomCategory}
          onSubmit={async (values) => {
            console.log(values)
            const res = await editCategory({ ...values, id: item.id })
            if (res) {
              message.error(res)
              return
            }
            await refetch()
            console.log(res)
          }}
          initialValues={item}
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            gap: 30,
            marginTop: 30,
          }}
        >
          {({ dirty, values, form, submitting }) => (
            <>
              <div
                style={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 30,
                  position: "relative",
                  overflowY: "scroll",
                  paddingRight: 12,
                  height: 0,
                  paddingBottom: 12,
                }}
              >
                <div style={{ display: "flex" }}>
                  <div style={{ fontSize: 64, fontWeight: 800 }}>{item.name}</div>
                  <div style={{ flexGrow: 1 }} />
                  <Overlay
                    button={
                      <Button color={Colors.red} disabled={submitting}>
                        삭제
                      </Button>
                    }
                  >
                    {({ close }) => (
                      <>
                        <div style={{ fontSize: 32, fontWeight: 800, textAlign: "center" }}>
                          주제 삭제
                        </div>
                        <div style={{ fontSize: 24, textAlign: "center" }}>
                          이 주제를 삭제할까요? 되돌릴 수 없습니다
                        </div>
                        <Button
                          color={Colors.red}
                          onClick={async () => {
                            close()
                            message.loading({ key: "delete", content: "삭제중..." }).then()
                            try {
                              const d = await deleteMutation(item.id)
                              if (d) {
                                message.error({ key: "delete", content: "삭제 실패" }).then()
                                return
                              }
                              await Router.push("/game/selectCategory")
                              message.success({ key: "delete", content: "삭제 성공" }).then()
                            } catch (e) {
                              message.error({ key: "delete", content: "삭제 실패" }).then()
                            }
                          }}
                        >
                          제거
                        </Button>
                        <Button onClick={() => close()}>취소</Button>
                      </>
                    )}
                  </Overlay>
                </div>
                <div
                  style={{
                    display: "grid",
                    gap: 30,
                    gridTemplateColumns: "1fr 1fr",
                    gridTemplateRows: "1fr 1fr",
                  }}
                >
                  <LabeledTextField autoComplete="off" name="name" label="주제 이름" />
                  <LabeledTextField autoComplete="off" name="description" label="주제 설명" />
                  <DifficultySelector />
                  <VisibilitySelector />
                </div>
                <div
                  style={{ padding: 20, background: "rgba(255, 255, 255, 0.2)", borderRadius: 20 }}
                >
                  <div style={{ fontSize: 24, fontWeight: 800, display: "flex" }}>
                    <div style={{ flexGrow: 1 }}>주제 공유</div>
                    <Overlay button={<MdAdd size={32} style={{ cursor: "pointer" }} />}>
                      {({ close }) => (
                        <Form
                          onSubmit={async (values) => {
                            setAddError(null)
                            const res = await addSharedUserMutation({
                              id: item.id,
                              userId: values.id,
                            })
                            if (res) {
                              setAddError(res)
                              return
                            }
                            close()
                            await refetch()
                          }}
                        >
                          {(props) => <UserAddDialog {...props} errorMessage={addError} />}
                        </Form>
                      )}
                    </Overlay>
                  </div>
                  <React.Suspense
                    fallback={
                      <div
                        style={{
                          width: "100%",
                          height: 300,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <RevolvingDot width={120} height={120} />
                      </div>
                    }
                  >
                    <div>
                      {!item.sharedUsers.length ? (
                        <div style={{ fontSize: 24 }}>공유된 유저가 없습니다</div>
                      ) : null}
                      {item.sharedUsers.map((x, i) => (
                        <SharedUserItem
                          onDelete={async () => {
                            const data = await removeSharedUserMutation({
                              id: item.id,
                              userId: x.userId,
                            })
                            if (data) {
                              return message.error(data)
                            }
                            await refetch()
                            await message.success("제거되었습니다.")
                          }}
                          userId={x.userId}
                          key={i}
                        />
                      ))}
                    </div>
                  </React.Suspense>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <div style={{ fontSize: 48, fontWeight: 800, flexGrow: 1 }}>단어 설정</div>
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "rgba(255, 255, 255, 0.2)",
                        borderRadius: 20,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        form.change("words", [...values.words, { word: "", hint: "" }])
                      }}
                    >
                      <MdAdd size={48} />
                    </div>
                  </div>
                  <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 20 }}>
                    {values.words.map((_, i) => (
                      <WordItem key={i} index={i} />
                    ))}
                  </div>
                </div>
              </div>
              <AnimatePresence>
                {dirty && (
                  <div style={{ position: "relative" }}>
                    <motion.div
                      initial={{
                        y: 20,
                        opacity: 0,
                      }}
                      animate={{
                        y: 0,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          bounce: 0,
                        },
                        opacity: 1,
                      }}
                      exit={{
                        y: 20,
                        opacity: 0,
                        transition: {
                          type: "tween",
                        },
                      }}
                      style={{
                        background: "rgb(47,47,47)",
                        width: "100%",
                        borderRadius: 20,
                        display: "flex",
                        alignItems: "center",
                        padding: 20,
                        color: "#fff",
                        height: 80,
                        gap: 10,
                        position: "absolute",
                      }}
                    >
                      <div style={{ fontSize: 24, fontWeight: 800 }}>
                        저장하지 않은 변경 사항이 있습니다
                      </div>
                      <div style={{ flexGrow: 1 }} />
                      <Button disabled={submitting} color={Colors.red} onClick={() => form.reset()}>
                        되돌리기
                      </Button>
                      <Button disabled={submitting} type="submit">
                        저장하기
                      </Button>
                    </motion.div>
                    <motion.div
                      animate={{
                        height: 80,
                      }}
                    />
                  </div>
                )}
              </AnimatePresence>
            </>
          )}
        </Form>
      ) : (
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ fontSize: 48, fontWeight: 800 }}>데이터를 찾을 수 없습니다.</div>
          <div style={{ fontSize: 32 }}>주제가 존재하지 않거나 권한이 없을 수 있습니다</div>
        </div>
      )}
    </div>
  )
}

CategoryEditor.getLayout = (component) => <GameLayout>{component}</GameLayout>

export default CategoryEditor
